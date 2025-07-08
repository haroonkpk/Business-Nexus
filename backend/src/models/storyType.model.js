import mongoose from 'mongoose';

const storyTypeSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});
const StoryType = mongoose.model('StoryType', storyTypeSchema);
export default StoryType;