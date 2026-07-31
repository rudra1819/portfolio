# Shapes a Project for the frontend project cards.
#
# The keys here mirror what src/components/Projects.jsx renders, so adding a
# field to a card means adding it in both places.
class ProjectSerializer
  def initialize(project)
    @project = project
  end

  def self.collection(projects)
    projects.map { |project| new(project).as_json }
  end

  def as_json(*)
    {
      id: project.name,
      title: project.title,
      description: project.summary,
      technologies: project.technologies,
      github: project.html_url,
      demo: project.demo_url,
      language: project.primary_language,
      languageShare: project.language_share,
      stars: project.stargazers_count,
      forks: project.forks_count,
      topics: project.topics,
      featured: project.featured?,
      # Frontend maps these onto react-icons / CSS gradients; nil means "pick a
      # default based on the language".
      iconKey: project.override&.icon_key,
      gradient: project.override&.gradient,
      pushedAt: project.pushed_at&.iso8601,
      createdAt: project.repo_created_at&.iso8601
    }
  end

  private

  attr_reader :project
end
