import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String,  },
    birthPlace:{type: String},
    birthDate:{type: String},
     status: {
    type: Boolean,
    default: true,
       },
    astrologerId:{
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ["user", "astrologer", "admin"],
      default: "user",
    },
    token: { type: String },
     refreshTokens: [
      {
        tokenHash: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        revokedAt: { type: Date },
        reason: { type: String },
      },
    ],
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
