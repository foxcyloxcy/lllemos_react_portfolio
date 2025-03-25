import { CiLink } from "react-icons/ci";

function Project(props) {

  const hoverBgColor = props.hoverBgColor
  return (
    <div className={`${hoverBgColor} backdrop-filter backdrop-blur-sm transition-all duration-300 p-6 md:rounded-xl`}>

        {props.technologies && (
          <img className="w-60" src={props.technologies} />
        )}
        <h3 className="font-bold text-lg mt-4">{ props.title }</h3>
        <p className="leading-7 font-light text-base mt-4">{ props.description }</p>
        
        <div className="flex gap-6 font-medium">
            {props.link && (
                <div className="flex gap-2 mt-4 hover:text-blue-600 cursor-pointer transition-all duration-300">
                    <CiLink className="text-2xl self-center" />
                    <a href={props.link} className="text-xs self-center">View Project</a>
                </div>
            )}
            {props.github && (
                <div className="flex gap-2 mt-4 hover:text-blue-600 cursor-pointer transition-all duration-300">
                    <CiLink className="text-2xl self-center" />
                    <a href={props.github} className="text-xs self-center">View Github</a>
                </div>
            )}
        </div>
    </div>
  )
}

export default Project