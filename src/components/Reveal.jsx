import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Reveals its children once they scroll into view.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.stagger=false] cascade the direct children instead of
 *   animating the container as one block
 */
const Reveal = ({ children, className = '', stagger = false, ...rest }) => {
  const [ref, isRevealed] = useScrollReveal();

  const classes = [
    stagger ? 'reveal-stagger' : 'reveal',
    isRevealed ? 'is-revealed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Reveal;
