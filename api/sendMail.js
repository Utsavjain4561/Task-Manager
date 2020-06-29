const cron = require("node-cron"),
  Todos = require("../models/Todos");

module.exports = {
  sendMail: function (user, transporter) {
    //Check progress
    function getProgress(todo) {
      let currentDate = new Date(),
        dueDate = todo.dueDate,
        startDate = todo.startDate;

      if (todo.isChecked) return "Completed";
      else {
        if (currentDate.getTime() > dueDate.getTime()) return "Pending";
        if (currentDate.getTime() - startDate.getTime() < 3600000) return "New";

        return "In Progress";
      }
    }

    //Pending tasks
    function getPendingTasks(user) {
      console.log("User is", user);
      let pending = [];
      Todos.find({ userId: user._id }, (err, todos) => {
        if (err) {
          console.log(err);
        } else {
          todos.forEach((todo) => {
            if (getProgress(todo) === "Pending") {
              pending.push(todo.title);
            }
          });

          let mailOptions = {
            from: process.env.email,
            to: user.username,
            subject: "Chores: Complete your pending tasks",
            template: "mail",
            context: {
              username: user.name,
              pending: pending,
              redirect: process.env.NODE_ENV==="production"?`https://whispering-falls-52777.herokuapp.com/user?user_id=${user._id}&name=${user.name}`:
              `http://localhost:3000/user?user_id=${user._id}&name=${user.name}`,
            },
          };
          if (pending && pending.length > 0) {
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Email sendt: ", +info.response);
              }
            });
          }
        }
      });
    }
    //getPendingTasks(user)
    cron.schedule("0 59 23 * * *", () => getPendingTasks(user), {
      scheduled: true,
      timezone: "Asia/Kolkata",
    });
  },
};
