import {motion} from "framer-motion"

export default function StoryCard({type}) {
  return (
    <motion.div
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      className="card card-sm bg-base-100 shadow-sm cursor-pointer group"
    >
      <figure>
        <img
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1"
          src={type.img}
          alt="story"
        />
      </figure>
      <div className="card-body transition-colors duration-300 ">
        <h2 className="card-title transition-colors duration-300 group-hover:text-blue-600">
          {type.title}
        </h2>
        <p>Click the button to watch on Jetflix app.</p>
      </div>
    </motion.div>
  );
}
