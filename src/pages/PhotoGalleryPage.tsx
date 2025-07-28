import PageTitle from '../components/layout/PageTitle';
import { mockData } from '../constants/mockData';

const PhotoGalleryPage = () => (
  <div>
    <PageTitle title="活動相簿" subtitle="重溫在山林間的美好回憶" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockData.albums.map((album) => (
        <div
          key={album.id}
          className="group relative rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={album.image}
            alt={album.title}
            className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-white text-2xl font-bold">{album.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PhotoGalleryPage;
