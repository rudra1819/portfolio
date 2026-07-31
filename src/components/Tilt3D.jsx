import { useTilt } from '../hooks/useTilt';
import './Tilt3D.css';

/**
 * Wraps children in a pointer-tracked 3D tilt surface with a specular highlight.
 *
 * The wrapper owns the perspective and rotation; children opt into depth by
 * setting `transform: translateZ(...)` themselves (see the .depth-* helpers in
 * Tilt3D.css). That split keeps the 3D maths in one place instead of spreading
 * transforms through every card.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]   applied to the inner surface
 * @param {number} [props.max=9]       maximum rotation in degrees
 * @param {boolean} [props.glare=true] render the moving highlight
 */
const Tilt3D = ({ children, className = '', max = 9, glare = true, ...rest }) => {
  const { ref, handlers } = useTilt({ max, glare });

  return (
    <div className="tilt3d" ref={ref} {...handlers} {...rest}>
      <div className={`tilt3d-surface ${className}`.trim()}>
        {children}
        {glare && <span className="tilt3d-glare" aria-hidden="true" />}
      </div>
    </div>
  );
};

export default Tilt3D;
