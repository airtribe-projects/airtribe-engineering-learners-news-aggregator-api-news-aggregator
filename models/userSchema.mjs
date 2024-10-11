import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    category: {
      type: String,
      enum: ['technology', 'sports', 'business', 'entertainment', 'health'],
      default: 'technology',
    },
    region: {
      type: String,
      enum: ['us', 'uk', 'in', 'au'],
      default: 'us',
    },
    sources: {
      type: [String],
      default: [],
    },
  },
}, { timestamps: true });

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash if password is modified or new
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Method to compare hashed password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model('User', userSchema);
export default User;
