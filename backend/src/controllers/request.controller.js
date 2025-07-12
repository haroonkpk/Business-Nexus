import CollabRequest from "../models/CollabRequest.js";
export const createRequest = async (req, res) => {
  const { toProfileId } = req.body;
  const fromProfileId = req.user.profileId;

  if (!fromProfileId) {
    return res.status(404).json({ msg: "Please create your profile first" });
  }

  const existing = await CollabRequest.findOne({
    from: fromProfileId,
    to: toProfileId,
  });
  if (existing) return res.status(400).json({ msg: "Request already sent" });

  const newRequest = await CollabRequest.create({
    from: fromProfileId,
    to: toProfileId,
  });

  res.status(201).json(newRequest);
};

export const getSentReqStatuses = async (req, res) => {
  const profileId = req.user.profileId;
  try {
    const sent = await CollabRequest.find({ from: profileId }).populate("to");
    res.json(sent);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sent requests" });
  }
};

export const getRequest = async (req, res) => {
  const profileId = req.user.profileId;
  const received = await CollabRequest.find({ to: profileId })
    .populate("from")
    .populate({ path: "from", populate: { path: "user" } });
  res.json(received);
};
