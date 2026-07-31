import {
  FaBook,
  FaCalculator,
  FaChartLine,
  FaCode,
  FaDumbbell,
  FaGraduationCap,
  FaJava,
  FaUsers,
} from 'react-icons/fa';
import { SiJavascript, SiPostgresql, SiReact, SiRubyonrails } from 'react-icons/si';

// iconKey values come from ProjectOverride#icon_key in the API. Adding a new
// key means adding it here too, otherwise the card falls back to a
// language-derived icon.
const ICONS = {
  'graduation-cap': FaGraduationCap,
  users: FaUsers,
  'chart-line': FaChartLine,
  calculator: FaCalculator,
  dumbbell: FaDumbbell,
  book: FaBook,
  code: FaCode,
  rails: SiRubyonrails,
  react: SiReact,
  java: FaJava,
  javascript: SiJavascript,
  postgresql: SiPostgresql,
};

// Used for repos with no curated override, so an auto-discovered project still
// gets a sensible icon and colour instead of a generic grey card.
//
// These deliberately stay inside the site's ruby-to-gold range rather than using
// each language's brand colour: a grid of cards is a composition, and dropping a
// JavaScript yellow next to a CSS blue reads as a bug, not as information. The
// language is already named on the banner chip.
const LANGUAGE_DEFAULTS = {
  Ruby: { icon: SiRubyonrails, gradient: 'linear-gradient(135deg, #8f1128, #e01e41)' },
  JavaScript: { icon: SiJavascript, gradient: 'linear-gradient(135deg, #ff6a3d, #ffc357)' },
  TypeScript: { icon: SiJavascript, gradient: 'linear-gradient(135deg, #9c2f5e, #e01e41)' },
  Java: { icon: FaJava, gradient: 'linear-gradient(135deg, #b5551f, #ff9a4d)' },
  HTML: { icon: FaCode, gradient: 'linear-gradient(135deg, #e01e41, #ff6a3d)' },
  CSS: { icon: FaCode, gradient: 'linear-gradient(135deg, #a01a5c, #d1568f)' },
  SCSS: { icon: FaCode, gradient: 'linear-gradient(135deg, #a01a5c, #cf649a)' },
  Shell: { icon: FaCode, gradient: 'linear-gradient(135deg, #8f6a11, #ffc357)' },
};

const FALLBACK = { icon: FaCode, gradient: 'linear-gradient(135deg, #e01e41, #ff8a3d)' };

/**
 * Resolves the icon element and banner gradient for a project card.
 *
 * @param {{iconKey?: string|null, gradient?: string|null, language?: string|null}} project
 */
export function projectVisuals(project) {
  const byLanguage = LANGUAGE_DEFAULTS[project.language] ?? FALLBACK;
  const Icon = ICONS[project.iconKey] ?? byLanguage.icon;

  return {
    icon: <Icon />,
    gradient: project.gradient || byLanguage.gradient,
  };
}
