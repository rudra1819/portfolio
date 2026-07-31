# Curation for the GitHub-sourced projects.
#
# GitHub is the source of truth for everything measurable (stars, languages,
# last push). This file supplies the parts GitHub does not have: polished
# titles and descriptions, hand-picked tech tags, ordering, and which repos to
# keep off the site. Nothing here is touched by `bin/rails github:sync`.
#
# Idempotent - safe to re-run with `bin/rails db:seed`.
#
# NOTE: four entries below (trading-dashboard, string_calculator_tdd,
# gym-website, lms-final) were showcased on the old static site but no longer
# exist on the GitHub account. Their copy is kept here so the cards reappear
# automatically if those repos are pushed again; until then `bin/rails
# github:preview` flags them as orphaned. Delete them if they are gone for good.

OVERRIDES = [
  {
    repo_name: "studentmart",
    title: "StudentMart",
    description: "A comprehensive student management platform built with Ruby on Rails, covering enrolment, catalogue and order flows.",
    technologies: [ "Ruby on Rails", "PostgreSQL", "HTML5", "CSS3" ],
    icon_key: "graduation-cap",
    gradient: "linear-gradient(135deg, #a01a5c, #e01e41)",
    featured: true,
    position: 1
  },
  {
    repo_name: "HR-mitra",
    title: "HR Mitra",
    description: "Human Resources management system for efficient HR operations, with background processing for payroll and reporting jobs.",
    technologies: [ "Ruby on Rails", "PostgreSQL", "Sidekiq" ],
    icon_key: "users",
    gradient: "linear-gradient(135deg, #e01e41, #ff6a3d)",
    featured: true,
    position: 2
  },
  {
    repo_name: "ror-technical-challenge",
    title: "ROR Technical Challenge",
    description: "Ruby on Rails technical challenge showcasing service objects, RESTful design and test coverage.",
    technologies: [ "Ruby on Rails", "PostgreSQL", "RESTful APIs" ],
    icon_key: "rails",
    gradient: "linear-gradient(135deg, #8f1128, #d1342f)",
    featured: true,
    position: 3
  },
  {
    repo_name: "portfolio",
    title: "Developer Portfolio",
    description: "This site: a React frontend backed by a Rails API that pulls project and language data straight from the GitHub API.",
    technologies: [ "React", "Vite", "Ruby on Rails", "PostgreSQL" ],
    icon_key: "code",
    gradient: "linear-gradient(135deg, #ff6a3d, #ffc357)",
    position: 4
  },
  {
    repo_name: "student-record-manager",
    title: "Student Record Manager",
    description: "A Java application to manage student records, built to practise core OOP design and file-backed persistence.",
    technologies: [ "Java", "OOP", "File I/O" ],
    icon_key: "book",
    gradient: "linear-gradient(135deg, #b5551f, #ff9a4d)",
    position: 5
  },

  # --- Kept off the site -----------------------------------------------------
  # Tutorial follow-alongs, proof-of-concept scratch repos and the raw resume
  # page. They are real repos, but they dilute the projects grid.
  { repo_name: "Resume", hidden: true },
  { repo_name: "toy-app", hidden: true },
  { repo_name: "P_O_C_Demo_2", hidden: true },
  { repo_name: "application_project", hidden: true },
  { repo_name: "rock-paper-scissors-game-programme", hidden: true },

  # --- Copy waiting on repos that are not on GitHub right now ----------------
  {
    repo_name: "trading-dashboard",
    title: "Trading Dashboard",
    description: "Real-time trading dashboard with analytics and monitoring, streaming price updates over ActionCable.",
    technologies: [ "Ruby on Rails", "Redis", "ActionCable" ],
    icon_key: "chart-line",
    gradient: "linear-gradient(135deg, #6d1030, #b01d3c)",
    position: 6
  },
  {
    repo_name: "string_calculator_tdd",
    title: "String Calculator TDD",
    description: "String calculator kata implemented strictly test-first, one RSpec example at a time.",
    technologies: [ "Ruby", "RSpec", "TDD" ],
    icon_key: "calculator",
    gradient: "linear-gradient(135deg, #c2183a, #ff8a3d)",
    position: 7
  },
  {
    repo_name: "gym-website",
    title: "Gym Website",
    description: "Modern gym website with membership management and class booking.",
    technologies: [ "Ruby on Rails", "PostgreSQL", "HTML5", "CSS3" ],
    icon_key: "dumbbell",
    gradient: "linear-gradient(135deg, #d1342f, #ffc357)",
    position: 8
  },
  {
    repo_name: "lms-final",
    title: "Learning Management System",
    description: "Learning Management System with course authoring, enrolment and student progress tracking.",
    technologies: [ "Ruby on Rails", "PostgreSQL", "ActiveRecord" ],
    icon_key: "book",
    gradient: "linear-gradient(135deg, #9c2f5e, #ff6a3d)",
    position: 9
  }
].freeze

OVERRIDES.each do |attributes|
  ProjectOverride.find_or_initialize_by(repo_name: attributes[:repo_name])
                 .update!(attributes)
end

puts "Seeded #{OVERRIDES.size} project override(s): " \
     "#{ProjectOverride.featured.count} featured, #{ProjectOverride.hidden.count} hidden"
