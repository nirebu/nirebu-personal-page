module Jekyll
  class VideoPage < Page
    def initialize(site, base, dir, videos, pagination_info)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'video_list.html')
      
      self.data['title'] = "Videos"
      self.data['videos'] = videos
      self.data['pagination'] = pagination_info
    end
  end

  class VideoPaginator < Generator
    safe true

    def generate(site)
      videos = site.data['videos']
      return unless videos

      # Default 10 per page
      per_page = 10
      total_pages = (videos.size.to_f / per_page).ceil
      
      # Split videos into chunks
      video_chunks = videos.each_slice(per_page).to_a

      video_chunks.each_with_index do |chunk, index|
        page_num = index + 1
        dir = page_num == 1 ? 'videos' : File.join('videos', 'page', page_num.to_s)
        
        pagination_info = {
          'curr_page' => page_num,
          'total_pages' => total_pages,
          'previous_url' => page_num > 1 ? (page_num == 2 ? "/videos/" : "/videos/page/#{page_num - 1}/") : nil,
          'next_url' => page_num < total_pages ? "/videos/page/#{page_num + 1}/" : nil
        }

        site.pages << VideoPage.new(site, site.source, dir, chunk, pagination_info)
      end
    end
  end
end
