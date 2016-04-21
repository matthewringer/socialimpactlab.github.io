require 'pandoc-ruby'
require 'pdfkit'

drafts_dir = '_drafts'
posts_dir  = '_posts'
epub_dir = './content/epub'

# rake post['my new post']
desc 'create a new post with "rake post[\'post title\']"'
task :post, :title do |t, args|
  if args.title
    title = args.title
  else
    puts "Please try again. Remember to include the filename."
  end
  mkdir_p "#{posts_dir}"
  filename = "#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.downcase.gsub(/[^\w]+/, '-')}.md"
  puts "Creating new post: #{filename}"
  File.open(filename, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    layout: post
    title: #{title}
    date: #{Time.new.strftime('%Y-%m-%d %H:%M')}
    categories:
    ---

    EOS
  end

# Uncomment the line below if you want the post to automatically open in your default text editor
#  system ("#{ENV['EDITOR']} #{filename}")
end

# usage: rake draft['my new draft']
desc 'create a new draft post with "rake draft[\'draft title\']"'
task :draft, :title do |t, args|
  if args.title
    title = args.title
  else
    puts "Please try again. Remember to include the filename."
  end
  mkdir_p "#{drafts_dir}"
  filename = "#{drafts_dir}/#{title.downcase.gsub(/[^\w]+/, '-')}.md"
  puts "Creating new draft: #{filename}"
  File.open(filename, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    layout: post
    title: #{title}
    date: #{Time.new.strftime('%Y-%m-%d %H:%M')}
    categories:
    ---

    EOS
  end

# Uncomment the line below if you want the draft to automatically open in your default text editor
# system ("#{ENV['EDITOR']} #{filename}")
end

desc 'preview the site with drafts'
task :preview do
  puts "## Generating site"
  puts "## Stop with ^C ( <CTRL>+C )"
  system "jekyll serve --watch --drafts"
end

desc 'list tasks'
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
  puts "(type rake -T for more detail)\n\n"
end

desc 'epub tasks'
task :epub do
  @converter = PandocRuby.new('# Markdown Title', :from => :markdown, :to => :rst)
  File.open("test.epub", "w") do |f|
    while line = @converter.convert.gets
        f.puts line.length
    end
  end
end

task :update do 
  # clears the epub output directory for now TODO: watch the files for changes
  FileUtils.rm Dir["#{epub_dir}/*"]
  # update ./_site/epub.yml 
  sh 'jekyll build'
  # to be replaced with gem executable once it's been deployed.
  sh 'ruby -Ilib ../../matthewringer/jekyll-ebook/bin/jekyll-ebook ./_site/epub.yml'
end

task :update_pdf do 
  begin
    system 'jekyll serve -B > /dev/null'
    kit = PDFKit.new('http://localhost:4000/resources/mandeoftech/')
    kit.to_file('./test.pdf')
  rescue
    
  ensure
    system 'pkill -f jekyll > /dev/null'
  end
  
end
