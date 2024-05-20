import { CiLink } from "react-icons/ci";

function Project({ theme, title, description, technologies, link, github }) {
  return (
    <div className="hover:bg-gray-200/70 backdrop-filter backdrop-blur-sm transition-all duration-300 p-6 md:rounded-xl">
        <img className="w-60" src={technologies + theme} />
        <h3 className="font-bold text-lg mt-4">{ title }</h3>
        <p className="leading-7 font-light text-base mt-4">{ description }</p>
        
        <div className="flex gap-6 font-medium">
            <div className="flex gap-2 mt-4 hover:text-blue-600 cursor-pointer transition-all duration-300">
                <CiLink className="text-2xl self-center" />
                <a href={link} className="text-xs self-center">View Project</a>
            </div>
            <div className="flex gap-2 mt-4 hover:text-blue-600 cursor-pointer transition-all duration-300">
                <CiLink className="text-2xl self-center" />
                <a href={github} className="text-xs self-center">View Github</a>
            </div>
            </div>
    </div>
  )
}

export default Project