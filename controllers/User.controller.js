import { User } from "../models/User.models.js";

const generateAccessToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();

        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false })

        return accessToken;


    } catch (error) {
        res.status(500).send("Something went wrong while generating referesh and access token")
    }
}
export const handleRegister = async (req, res) => {
  //steps -

  // catch parameteres form req.body.
  const { name, username, password } = req.body;
  // validations - not empty.
  if (username === "" || name === "" || password === "")
    res.status(400).send("All fields are required!!");

  // check if user already exists.

  const existedUser = await User.findOne({ username });

  if (existedUser) {
    res.status(409).send("User already exists");
  }

  const user = await User.create({
    name,
    username,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -accessToken"
  );

  if (!createdUser) {
    res.status(500).send("Something went wrong while registering the user");
  }

  return res.status(201).json({
    message: "User has been registered successfully",
    user: createdUser,
  });
};

export const loginUser = async (req, res) => {
 
  const { username, password } = req.body;

  if (!username) {
    res.status(401).send("Username is required");
  }

  const user = await User.findOne({
    username,
  });

  if (!user) {
    res.status(400).send("User doesn't exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    res.status(401).send("Invalid credentails");
  }

  const accessToken = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -accessToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("accessToken", accessToken, options).json({
    message: "User logged in successfully",

    user: loggedInUser,
    accessToken,
  });
};

export const logoutUser = async (req, res) => {
 
};
