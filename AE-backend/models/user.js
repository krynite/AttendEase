const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 5,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
      enum: ["admin", "staff", "general"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
