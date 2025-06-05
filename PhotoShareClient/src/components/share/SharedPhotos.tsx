// // // import { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { Eye, Calendar, HardDrive, User, X } from 'lucide-react';
// // // import { clearMessage, getSharedPhotos } from '../slices/photoSlice';
// // // import { AppDispatch } from '../store/store';
// // // import { Photo } from '../types/photo';

// // // const SharedPhotos= () => {
// // //   const dispatch = useDispatch<AppDispatch>()
// // //   const { sharedPhotos, loading, msg } = useSelector(
// // //     (state: { photo: { sharedPhotos: Photo[]; loading: boolean; msg: string } }) => state.photo,
// // //   )
// // //   const [selectedPhoto, setSelectedPhoto] = useState({} as Photo);
// // //   const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({});

// // //   const token = sessionStorage.getItem("token") || "";
// // //   const userId = useSelector((state: { user: { user: { id: number } } }) => state.user.user.id) as number;


// // //   useEffect(() => {
// // //     dispatch(getSharedPhotos({ token, userId }));

// // //     dispatch(clearMessage());
// // //   }, [dispatch, token, userId]);

// // //   const handleImageError = (photoId: number) => {
// // //     setImageLoadError(prev => ({ ...prev, [photoId]: true }));
// // //   };

// // //   const formatFileSize = (bytes: number) => {
// // //     if (bytes === 0) return '0 Bytes';
// // //     const k = 1024;
// // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// // //   };

// // //   const openModal = (photo: Photo) => {
// // //     setSelectedPhoto(photo);
// // //   };

// // //   const closeModal = () => {
// // //     setSelectedPhoto({} as Photo);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// // //         <span className="ml-3 text-gray-600">Loading shared photos...</span>
// // //       </div>
// // //     );
// // //   }

// // //   if (msg && msg.includes('Failed')) {
// // //     return (
// // //       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// // //         <div className="flex items-center">
// // //           <div className="text-red-600 font-medium">Error loading shared photos</div>
// // //         </div>
// // //         <div className="text-red-600 text-sm mt-1">{msg}</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!sharedPhotos || sharedPhotos.length === 0) {
// // //     return (
// // //       <div className="text-center py-12">
// // //         <div className="text-gray-500 text-lg mb-2">No shared photos found</div>
// // //         <div className="text-gray-400">Photos shared with you will appear here</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-6">
// // //       <div className="mb-6">
// // //         <h1 className="text-2xl font-bold text-gray-800 mb-2">Photos Shared With Me</h1>
// // //         <p className="text-gray-600">View photos that others have shared with you</p>
// // //       </div>

// // //       {/* Photo Grid */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// // //         {sharedPhotos.map((photo) => (
// // //           <div
// // //             key={`${photo.id}-${photo.name}`}
// // //             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
// // //             onClick={() => openModal(photo)}
// // //           >
// // //             <div className="aspect-square relative overflow-hidden">
// // //               {photo.id !== undefined && imageLoadError[photo.id as keyof typeof imageLoadError] ? (
// // //                 <div className="w-full h-full bg-gray-200 flex items-center justify-center">
// // //                   <div className="text-gray-500 text-center">
// // //                     <HardDrive className="mx-auto mb-2" size={24} />
// // //                     <span className="text-sm">Image unavailable</span>
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <img
// // //                   src={photo.url}
// // //                   alt={photo.name}
// // //                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
// // //                   onError={() => {
// // //                     if (typeof photo.id === 'number') {
// // //                       handleImageError(photo.id);
// // //                     }
// // //                   }}
// // //                 />
// // //               )}
// // //             </div>

// // //             <div className="p-3">
// // //               <div className="font-medium text-gray-800 truncate mb-1">{photo.name}</div>
// // //               <div className="flex items-center justify-between text-sm text-gray-500">
// // //                 <div className="flex items-center">
// // //                   <Eye size={14} className="mr-1" />
// // //                   <span>{photo.countViews}</span>
// // //                 </div>
// // //                 <div className="text-xs">{formatFileSize(photo.size)}</div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Modal */}
// // //       {selectedPhoto && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
// // //             <div className="flex items-center justify-between p-4 border-b">
// // //               <h2 className="text-lg font-semibold text-gray-800">{selectedPhoto.name}</h2>
// // //               <button
// // //                 onClick={closeModal}
// // //                 className="text-gray-500 hover:text-gray-700 transition-colors"
// // //               >
// // //                 <X size={24} />
// // //               </button>
// // //             </div>

// // //             <div className="p-4">
// // //               <div className="mb-4">
// // //                 {typeof selectedPhoto.id === 'number' && imageLoadError[selectedPhoto.id] ? (
// // //                   <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
// // //                     <div className="text-gray-500 text-center">
// // //                       <HardDrive className="mx-auto mb-2" size={48} />
// // //                       <span>Image unavailable</span>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <img
// // //                     src={selectedPhoto.url}
// // //                     alt={selectedPhoto.name}
// // //                     className="w-full max-h-96 object-contain rounded"
// // //                     onError={() => {
// // //                       if (typeof selectedPhoto.id === 'number') {
// // //                         handleImageError(selectedPhoto.id);
// // //                       }
// // //                     }}
// // //                   />
// // //                 )}
// // //               </div>

// // //               <div className="grid grid-cols-2 gap-4 text-sm">
// // //                 <div className="flex items-center text-gray-600">
// // //                   <HardDrive size={16} className="mr-2" />
// // //                   <span>Size: {formatFileSize(selectedPhoto.size)}</span>
// // //                 </div>
// // //                 <div className="flex items-center text-gray-600">
// // //                   <Eye size={16} className="mr-2" />
// // //                   <span>Views: {selectedPhoto.countViews}</span>
// // //                 </div>
// // //                 <div className="flex items-center text-gray-600">
// // //                   <User size={16} className="mr-2" />
// // //                   <span>Shared by User ID: {selectedPhoto.userId}</span>
// // //                 </div>
// // //                 <div className="flex items-center text-gray-600">
// // //                   <Calendar size={16} className="mr-2" />
// // //                   <span>Created: {selectedPhoto.createdAt && selectedPhoto.createdAt !== "0001-01-01T00:00:00" ? new Date(selectedPhoto.createdAt).toLocaleDateString() : 'Unknown'}</span>
// // //                 </div>
// // //               </div>

// // //               {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
// // //                 <div className="mt-4">
// // //                   <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
// // //                   <div className="flex flex-wrap gap-1 mt-1">
// // //                     {selectedPhoto.tags.map((tag, index) => (
// // //                       <span
// // //                         key={index}
// // //                         className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
// // //                       >
// // //                         {tag.name}
// // //                       </span>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // /////////////////////////////////////////////////////////////////
// // /////////////////////////////////////////////////////////////////
// // // // export default SharedPhotos;

// // // import { useEffect, useState } from 'react';
// // // import { Eye, Calendar, HardDrive, User, X, Heart, Share2, Download, ZoomIn } from 'lucide-react';
// // // import { Photo } from '../types/photo';


// // // const SharedPhotos = () => {
// // //   const [photos] = useState<Photo[]>([] as Photo[]); 
// // //   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({});
// // //   const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
// // //   const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

// // //   useEffect(() => {
// // //     // Simulate loading
// // //     setTimeout(() => setLoading(false), 1000);
// // //   }, []);

// // //   const handleImageError = (photoId:number) => {
// // //     setImageLoadError(prev => ({ ...prev, [photoId]: true }));
// // //   };

// // //   const formatFileSize = (bytes:number) => {
// // //     if (bytes === 0) return '0 Bytes';
// // //     const k = 1024;
// // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// // //   };

// // //   const openModal = (photo:Photo) => {
// // //     setSelectedPhoto(photo);
// // //     document.body.style.overflow = 'hidden';
// // //   };

// // //   const closeModal = () => {
// // //     setSelectedPhoto(null);
// // //     document.body.style.overflow = 'unset';
// // //   };

// // //   const toggleLike = (photoId:number) => {
// // //     setLikedPhotos(prev => {
// // //       const newSet = new Set(prev);
// // //       if (newSet.has(photoId)) {
// // //         newSet.delete(photoId);
// // //       } else {
// // //         newSet.add(photoId);
// // //       }
// // //       return newSet;
// // //     });
// // //   };

// // //   // Simple masonry layout implementation
// // //   const MasonryLayout: React.FC<{ children: React.ReactNode; columns?: number }> = ({ children, columns = 4 }) => {
// // //     return (
// // //       <div 
// // //         className="w-full"
// // //         style={{
// // //           columnCount: columns,
// // //           columnGap: '1rem',
// // //           columnFill: 'balance'
// // //         }}
// // //       >
// // //         {children}
// // //       </div>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="relative">
// // //             <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mb-4 mx-auto"></div>
// // //             <div className="absolute inset-0 w-16 h-16 border-4 border-pink-200 rounded-full animate-spin border-t-pink-600 m-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
// // //           </div>
// // //           <p className="text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// // //             Loading magical moments...
// // //           </p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!photos || photos.length === 0) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
// // //         <div className="text-center p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
// // //           <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
// // //             <Eye size={40} className="text-white" />
// // //           </div>
// // //           <h3 className="text-2xl font-bold text-gray-800 mb-2">No shared photos yet</h3>
// // //           <p className="text-gray-600">Photos shared with you will appear here like magic ✨</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
// // //       {/* Header */}
// // //       <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-pink-600/90 backdrop-blur-sm">
// // //         <div className="absolute inset-0 bg-black/10"></div>
// // //         <div className="relative container mx-auto px-6 py-16">
// // //           <div className="text-center">
// // //             <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
// // //               Shared <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Memories</span>
// // //             </h1>
// // //             <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
// // //               Discover beautiful moments shared by your community
// // //             </p>
// // //             <div className="mt-6 flex items-center justify-center space-x-6 text-white/80">
// // //               <div className="flex items-center space-x-2">
// // //                 <Eye size={20} />
// // //                 <span>{photos.reduce((sum, photo) => sum + photo.countViews, 0)} total views</span>
// // //               </div>
// // //               <div className="w-1 h-1 bg-white/60 rounded-full"></div>
// // //               <div className="flex items-center space-x-2">
// // //                 <HardDrive size={20} />
// // //                 <span>{photos.length} photos</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
// // //       </div>

// // //       {/* Photo Masonry Grid */}
// // //       <div className="container mx-auto px-6 py-12">
// // //         <div className="max-w-7xl mx-auto">
// // //           <MasonryLayout columns={window.innerWidth > 1200 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1}>
// // //             {photos.map((photo, index) => (
// // //               <div
// // //                 key={photo.id}
// // //                 className="break-inside-avoid mb-6 group cursor-pointer"
// // //                 style={{ animationDelay: `${index * 100}ms` }}
// // //                 onMouseEnter={() => photo.id !== undefined ? setHoveredPhoto(photo.id) : setHoveredPhoto(null)}
// // //                 onMouseLeave={() => setHoveredPhoto(null)}
// // //                 onClick={() => openModal(photo)}
// // //               >
// // //                 <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
// // //                   {/* Image Container */}
// // //                   <div className="relative overflow-hidden">
// // //                     {typeof photo.id === 'number' && imageLoadError[photo.id] ? (
// // //                       <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
// // //                         <div className="text-center text-gray-500">
// // //                           <HardDrive size={32} className="mx-auto mb-2 opacity-50" />
// // //                           <span className="text-sm">Image unavailable</span>
// // //                         </div>
// // //                       </div>
// // //                     ) : (
// // //                       <img
// // //                         src={photo.url}
// // //                         alt={photo.name}
// // //                         className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
// // //                         onError={() => typeof photo.id === 'number' && handleImageError(photo.id)}
// // //                         style={{ aspectRatio: `400/${photo.height}` }}
// // //                       />
// // //                     )}
                    
// // //                     {/* Overlay */}
// // //                     <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${hoveredPhoto === photo.id ? 'opacity-100' : 'opacity-0'}`}>
// // //                       <div className="absolute bottom-4 left-4 right-4">
// // //                         <div className="flex items-center justify-between">
// // //                           <div className="flex items-center space-x-3">
// // //                             <button
// // //                               onClick={(e) => {
// // //                                 e.stopPropagation();
// // //                                 if (typeof photo.id === 'number') {
// // //                                   toggleLike(photo.id);
// // //                                 }
// // //                               }}
// // //                               className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
// // //                             >
// // //                               <Heart 
// // //                                 size={18} 
// // //                                 className={`${typeof photo.id === 'number' && likedPhotos.has(photo.id) ? 'text-red-400 fill-current' : 'text-white'} transition-colors`} 
// // //                               />
// // //                             </button>
// // //                             <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
// // //                               <Share2 size={18} className="text-white" />
// // //                             </button>
// // //                           </div>
// // //                           <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
// // //                             <ZoomIn size={18} className="text-white" />
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Card Content */}
// // //                   <div className="p-5">
// // //                     <h3 className="font-bold text-gray-800 text-lg mb-2 truncate group-hover:text-purple-600 transition-colors">
// // //                       {photo.name}
// // //                     </h3>
                    
// // //                     <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
// // //                       <div className="flex items-center space-x-4">
// // //                         <div className="flex items-center space-x-1">
// // //                           <Eye size={14} className="text-purple-500" />
// // //                           <span className="font-medium">{photo.countViews}</span>
// // //                         </div>
// // //                         <div className="flex items-center space-x-1">
// // //                           <HardDrive size={14} className="text-blue-500" />
// // //                           <span>{formatFileSize(photo.size)}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     {/* Tags */}
// // //                     {photo.tags && photo.tags.length > 0 && (
// // //                       <div className="flex flex-wrap gap-1.5">
// // //                         {photo.tags.slice(0, 3).map((tag, tagIndex) => (
// // //                           <span
// // //                             key={tagIndex}
// // //                             className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200/50"
// // //                           >
// // //                             #{tag.name}
// // //                           </span>
// // //                         ))}
// // //                         {photo.tags.length > 3 && (
// // //                           <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
// // //                             +{photo.tags.length - 3}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </MasonryLayout>
// // //         </div>
// // //       </div>

// // //       {/* Modal */}
// // //       {selectedPhoto && (
// // //         <div 
// // //           className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
// // //           onClick={closeModal}
// // //         >
// // //           <div 
// // //             className="bg-white rounded-3xl max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             {/* Modal Header */}
// // //             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
// // //               <div>
// // //                 <h2 className="text-2xl font-bold text-gray-800">{selectedPhoto.name}</h2>
// // //                 <p className="text-gray-600 mt-1">Shared by User #{selectedPhoto.userId}</p>
// // //               </div>
// // //               <button
// // //                 onClick={closeModal}
// // //                 className="p-3 bg-white/80 hover:bg-white rounded-full transition-colors shadow-md"
// // //               >
// // //                 <X size={24} className="text-gray-600" />
// // //               </button>
// // //             </div>

// // //             <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
// // //               {/* Image */}
// // //               <div className="mb-6 rounded-2xl overflow-hidden bg-gray-50">
// // //                 {typeof selectedPhoto.id === 'number' && imageLoadError[selectedPhoto.id] ? (
// // //                   <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
// // //                     <div className="text-center text-gray-500">
// // //                       <HardDrive size={48} className="mx-auto mb-3 opacity-50" />
// // //                       <span className="text-lg">Image unavailable</span>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <img
// // //                     src={selectedPhoto.url}
// // //                     alt={selectedPhoto.name}
// // //                     className="w-full max-h-96 object-contain"
// // //                     onError={() => typeof selectedPhoto.id === 'number' && handleImageError(selectedPhoto.id)}
// // //                   />
// // //                 )}
// // //               </div>

// // //               {/* Info Grid */}
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 <div className="space-y-4">
// // //                   <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
// // //                     <div className="p-3 bg-purple-500 rounded-lg mr-4">
// // //                       <HardDrive size={20} className="text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm text-purple-600 font-medium">File Size</p>
// // //                       <p className="text-lg font-bold text-purple-800">{formatFileSize(selectedPhoto.size)}</p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
// // //                     <div className="p-3 bg-blue-500 rounded-lg mr-4">
// // //                       <Eye size={20} className="text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm text-blue-600 font-medium">Total Views</p>
// // //                       <p className="text-lg font-bold text-blue-800">{selectedPhoto.countViews}</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="space-y-4">
// // //                   <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
// // //                     <div className="p-3 bg-green-500 rounded-lg mr-4">
// // //                       <User size={20} className="text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm text-green-600 font-medium">Shared By</p>
// // //                       <p className="text-lg font-bold text-green-800">User #{selectedPhoto.userId}</p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
// // //                     <div className="p-3 bg-orange-500 rounded-lg mr-4">
// // //                       <Calendar size={20} className="text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm text-orange-600 font-medium">Created</p>
// // //                       <p className="text-lg font-bold text-orange-800">
// // //                         {new Date(selectedPhoto.createdAt ?? '').toLocaleDateString()}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Tags */}
// // //               {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
// // //                 <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
// // //                   <h3 className="text-lg font-bold text-gray-800 mb-3">Tags</h3>
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {selectedPhoto.tags.map((tag, index) => (
// // //                       <span
// // //                         key={index}
// // //                         className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow"
// // //                       >
// // //                         #{tag.name}
// // //                       </span>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {/* Action Buttons */}
// // //               <div className="mt-6 flex flex-wrap gap-3">
// // //                 <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md">
// // //                   <Heart size={18} />
// // //                   <span>Like</span>
// // //                 </button>
// // //                 <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-md">
// // //                   <Share2 size={18} />
// // //                   <span>Share</span>
// // //                 </button>
// // //                 <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-md">
// // //                   <Download size={18} />
// // //                   <span>Download</span>
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SharedPhotos;

// // // import { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { Eye, Calendar, HardDrive, User, X } from 'lucide-react';
// // // import { clearMessage, getSharedPhotos } from '../slices/photoSlice';
// // // import { AppDispatch } from '../store/store';
// // // import { Photo } from '../types/photo';

// // // const SharedPhotos= () => {
// // //   const dispatch = useDispatch<AppDispatch>()
// // //   const { sharedPhotos, loading, msg } = useSelector(
// // //     (state: { photo: { sharedPhotos: Photo[]; loading: boolean; msg: string } }) => state.photo,
// // //   )
// // //   const [selectedPhoto, setSelectedPhoto] = useState({} as Photo);
// // //   const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({});

// // //   const token = sessionStorage.getItem("token") || "";
// // //   const userId = useSelector((state: { user: { user: { id: number } } }) => state.user.user.id) as number;


// // //   useEffect(() => {
// // //     dispatch(getSharedPhotos({ token, userId }));

// // //     dispatch(clearMessage());
// // //   }, [dispatch, token, userId]);

// // //   const handleImageError = (photoId: number) => {
// // //     setImageLoadError(prev => ({ ...prev, [photoId]: true }));
// // //   };

// // //   const formatFileSize = (bytes: number) => {
// // //     if (bytes === 0) return '0 Bytes';
// // //     const k = 1024;
// // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// // //   };

// // //   const openModal = (photo: Photo) => {
// // //     setSelectedPhoto(photo);
// // //   };

// // //   const closeModal = () => {
// // //     setSelectedPhoto({} as Photo);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// // //         <span className="ml-3 text-gray-600">Loading shared photos...</span>
// // //       </div>
// // //     );
// // //   }

// // //   if (msg && msg.includes('Failed')) {
// // //     return (
// // //       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// // //         <div className="flex items-center">
// // //           <div className="text-red-600 font-medium">Error loading shared photos</div>
// // //         </div>
// // //         <div className="text-red-600 text-sm mt-1">{msg}</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!sharedPhotos || sharedPhotos.length === 0) {
// // //     return (
// // //       <div className="text-center py-12">
// // //         <div className="text-gray-500 text-lg mb-2">No shared photos found</div>
// // //         <div className="text-gray-400">Photos shared with you will appear here</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-6">
// // //       <div className="mb-6">
// // //         <h1 className="text-2xl font-bold text-gray-800 mb-2">Photos Shared With Me</h1>
// // //         <p className="text-gray-600">View photos that others have shared with you</p>
// // //       </div>

// // //       {/* Photo Grid */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// // //         {sharedPhotos.map((photo) => (
// // //           <div
// // //             key={`${photo.id}-${photo.name}`}
// // //             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
// // //             onClick={() => openModal(photo)}
// // //           >
// // //             <div className="aspect-square relative overflow-hidden">
// // //               {photo.id !== undefined && imageLoadError[photo.id as keyof typeof imageLoadError] ? (
// // //                 <div className="w-full h-full bg-gray-200 flex items-center justify-center">
// // //                   <div className="text-gray-500 text-center">
// // //                     <HardDrive className="mx-auto mb-2" size={24} />
// // //                     <span className="text-sm">Image unavailable</span>
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <img
// // //                   src={photo.url}
// // //                   alt={photo.name}
// // //                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
// // //                   onError={() => {
// // //                     if (typeof photo.id === 'number') {
// // //                       handleImageError(photo.id);
// // //                     }
// // //                   }}
// // //                 />
// // //               )}
// // //             </div>

// // //             <div className="p-3">
// // //               <div className="font-medium text-gray-800 truncate mb-1">{photo.name}</div>
// // //               <div className="flex items-center justify-between text-sm text-gray-500">
// // //                 <div className="flex items-center">
// // //                   <Eye size={14} className="mr-1" />
// // //                   <span>{photo.countViews}</span>
// // //                 </div>
// // //                 <div className="text-xs">{formatFileSize(photo.size)}</div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Modal */}
// // //       {selectedPhoto && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
// // //             <div className="flex items-center justify-between p-4 border-b">
// // //               <h2 className="text-lg font-semibold text-gray-800">{selectedPhoto.name}</h2>
// // //               <button
// // //                 onClick={closeModal}
// // //                 className="text-gray-500 hover:text-gray-700 transition-colors"
// // //               >
// // //                 <X size={24} />
// // //               </button>
// // //             </div>

// // //             <div className="p-4">
// // //               <div className="mb-4">
// // //                 {typeof selectedPhoto.id === 'number' && imageLoadError[selectedPhoto.id] ? (
// // //                   <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
// // //                     <div className="text-gray-500 text-center">
// // //                       <HardDrive className="mx-auto mb-2" size={48} />
// // //                       <span>Image unavailable</span>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <img
// // //                     src={selectedPhoto.url}
// // //                     alt={selectedPhoto.name}
// // //                     className="w-full max-h-96 object-contain rounded"
// // //                     onError={() => {
// // //                       if (typeof selectedPhoto.id === 'number') {
// // //                         handleImageError(selectedPhoto.id);
// // //                       }
// // //                     }}
// // //                   />
// // //                 )}
// // //               </div>

// // //               <div className="grid grid-cols-2 gap-4 text-sm">
// // //                 <div className="flex items-center text-gray-600">
// // //                   <HardDrive size={16} className="mr-2" />
// // //                   <span>Size: {formatFileSize(selectedPhoto.size)}</span>
// // //                 </div>
// // //                 <div className="flex items-center text-gray-600">
// // //                   <Eye size={16} className="mr-2" />
// // //                   <span>Views: {selectedPhoto.countViews}</span>
// // //                 </div>
// // //                 <div className="flex items-center text-gray-600">
// // //                   <User size={16} className="mr-2" />
// // //                   <span>Shared by User ID: {selectedPhoto.userId}</span>
// // //                 </div>
// // //                 <div className="flex items-center text-gray-600">
// // //                   <Calendar size={16} className="mr-2" />
// // //                   <span>Created: {selectedPhoto.createdAt && selectedPhoto.createdAt !== "0001-01-01T00:00:00" ? new Date(selectedPhoto.createdAt).toLocaleDateString() : 'Unknown'}</span>
// // //                 </div>
// // //               </div>

// // //               {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
// // //                 <div className="mt-4">
// // //                   <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
// // //                   <div className="flex flex-wrap gap-1 mt-1">
// // //                     {selectedPhoto.tags.map((tag, index) => (
// // //                       <span
// // //                         key={index}
// // //                         className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
// // //                       >
// // //                         {tag.name}
// // //                       </span>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SharedPhotos;

// // import { useEffect, useState } from 'react';
// // import { Eye, Calendar, HardDrive, User, X, Heart, Share2, Download, ZoomIn } from 'lucide-react';
// // import { Photo } from '../types/photo';


// // const SharedPhotos = () => {
// //   const [photos] = useState<Photo[]>([] as Photo[]); 
// //   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({});
// //   const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
// //   const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

// //   useEffect(() => {
// //     // Simulate loading
// //     setTimeout(() => setLoading(false), 1000);
// //   }, []);

// //   const handleImageError = (photoId:number) => {
// //     setImageLoadError(prev => ({ ...prev, [photoId]: true }));
// //   };

// //   const formatFileSize = (bytes:number) => {
// //     if (bytes === 0) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// //   };

// //   const openModal = (photo:Photo) => {
// //     setSelectedPhoto(photo);
// //     document.body.style.overflow = 'hidden';
// //   };

// //   const closeModal = () => {
// //     setSelectedPhoto(null);
// //     document.body.style.overflow = 'unset';
// //   };

// //   const toggleLike = (photoId:number) => {
// //     setLikedPhotos(prev => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(photoId)) {
// //         newSet.delete(photoId);
// //       } else {
// //         newSet.add(photoId);
// //       }
// //       return newSet;
// //     });
// //   };

// //   // Simple masonry layout implementation
// //   const MasonryLayout: React.FC<{ children: React.ReactNode; columns?: number }> = ({ children, columns = 4 }) => {
// //     return (
// //       <div 
// //         className="w-full"
// //         style={{
// //           columnCount: columns,
// //           columnGap: '1rem',
// //           columnFill: 'balance'
// //         }}
// //       >
// //         {children}
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="relative">
// //             <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mb-4 mx-auto"></div>
// //             <div className="absolute inset-0 w-16 h-16 border-4 border-pink-200 rounded-full animate-spin border-t-pink-600 m-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
// //           </div>
// //           <p className="text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //             Loading magical moments...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!photos || photos.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
// //         <div className="text-center p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
// //           <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
// //             <Eye size={40} className="text-white" />
// //           </div>
// //           <h3 className="text-2xl font-bold text-gray-800 mb-2">No shared photos yet</h3>
// //           <p className="text-gray-600">Photos shared with you will appear here like magic ✨</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
// //       {/* Header */}
// //       <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-pink-600/90 backdrop-blur-sm">
// //         <div className="absolute inset-0 bg-black/10"></div>
// //         <div className="relative container mx-auto px-6 py-16">
// //           <div className="text-center">
// //             <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
// //               Shared <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Memories</span>
// //             </h1>
// //             <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
// //               Discover beautiful moments shared by your community
// //             </p>
// //             <div className="mt-6 flex items-center justify-center space-x-6 text-white/80">
// //               <div className="flex items-center space-x-2">
// //                 <Eye size={20} />
// //                 <span>{photos.reduce((sum, photo) => sum + photo.countViews, 0)} total views</span>
// //               </div>
// //               <div className="w-1 h-1 bg-white/60 rounded-full"></div>
// //               <div className="flex items-center space-x-2">
// //                 <HardDrive size={20} />
// //                 <span>{photos.length} photos</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
// //       </div>

// //       {/* Photo Masonry Grid */}
// //       <div className="container mx-auto px-6 py-12">
// //         <div className="max-w-7xl mx-auto">
// //           <MasonryLayout columns={window.innerWidth > 1200 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1}>
// //             {photos.map((photo, index) => (
// //               <div
// //                 key={photo.id}
// //                 className="break-inside-avoid mb-6 group cursor-pointer"
// //                 style={{ animationDelay: `${index * 100}ms` }}
// //                 onMouseEnter={() => photo.id !== undefined ? setHoveredPhoto(photo.id) : setHoveredPhoto(null)}
// //                 onMouseLeave={() => setHoveredPhoto(null)}
// //                 onClick={() => openModal(photo)}
// //               >
// //                 <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
// //                   {/* Image Container */}
// //                   <div className="relative overflow-hidden">
// //                     {typeof photo.id === 'number' && imageLoadError[photo.id] ? (
// //                       <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
// //                         <div className="text-center text-gray-500">
// //                           <HardDrive size={32} className="mx-auto mb-2 opacity-50" />
// //                           <span className="text-sm">Image unavailable</span>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <img
// //                         src={photo.url}
// //                         alt={photo.name}
// //                         className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
// //                         onError={() => typeof photo.id === 'number' && handleImageError(photo.id)}
// //                       />
// //                     )}
                    
// //                     {/* Overlay */}
// //                     <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${hoveredPhoto === photo.id ? 'opacity-100' : 'opacity-0'}`}>
// //                       <div className="absolute bottom-4 left-4 right-4">
// //                         <div className="flex items-center justify-between">
// //                           <div className="flex items-center space-x-3">
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 if (typeof photo.id === 'number') {
// //                                   toggleLike(photo.id);
// //                                 }
// //                               }}
// //                               className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
// //                             >
// //                               <Heart 
// //                                 size={18} 
// //                                 className={`${typeof photo.id === 'number' && likedPhotos.has(photo.id) ? 'text-red-400 fill-current' : 'text-white'} transition-colors`} 
// //                               />
// //                             </button>
// //                             <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
// //                               <Share2 size={18} className="text-white" />
// //                             </button>
// //                           </div>
// //                           <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
// //                             <ZoomIn size={18} className="text-white" />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card Content */}
// //                   <div className="p-5">
// //                     <h3 className="font-bold text-gray-800 text-lg mb-2 truncate group-hover:text-purple-600 transition-colors">
// //                       {photo.name}
// //                     </h3>
                    
// //                     <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
// //                       <div className="flex items-center space-x-4">
// //                         <div className="flex items-center space-x-1">
// //                           <Eye size={14} className="text-purple-500" />
// //                           <span className="font-medium">{photo.countViews}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-1">
// //                           <HardDrive size={14} className="text-blue-500" />
// //                           <span>{formatFileSize(photo.size)}</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Tags */}
// //                     {photo.tags && photo.tags.length > 0 && (
// //                       <div className="flex flex-wrap gap-1.5">
// //                         {photo.tags.slice(0, 3).map((tag, tagIndex) => (
// //                           <span
// //                             key={tagIndex}
// //                             className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200/50"
// //                           >
// //                             #{tag.name}
// //                           </span>
// //                         ))}
// //                         {photo.tags.length > 3 && (
// //                           <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
// //                             +{photo.tags.length - 3}
// //                           </span>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </MasonryLayout>
// //         </div>
// //       </div>

// //       {/* Modal */}
// //       {selectedPhoto && (
// //         <div 
// //           className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
// //           onClick={closeModal}
// //         >
// //           <div 
// //             className="bg-white rounded-3xl max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             {/* Modal Header */}
// //             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
// //               <div>
// //                 <h2 className="text-2xl font-bold text-gray-800">{selectedPhoto.name}</h2>
// //                 <p className="text-gray-600 mt-1">Shared by User #{selectedPhoto.userId}</p>
// //               </div>
// //               <button
// //                 onClick={closeModal}
// //                 className="p-3 bg-white/80 hover:bg-white rounded-full transition-colors shadow-md"
// //               >
// //                 <X size={24} className="text-gray-600" />
// //               </button>
// //             </div>

// //             <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
// //               {/* Image */}
// //               <div className="mb-6 rounded-2xl overflow-hidden bg-gray-50">
// //                 {typeof selectedPhoto.id === 'number' && imageLoadError[selectedPhoto.id] ? (
// //                   <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
// //                     <div className="text-center text-gray-500">
// //                       <HardDrive size={48} className="mx-auto mb-3 opacity-50" />
// //                       <span className="text-lg">Image unavailable</span>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <img
// //                     src={selectedPhoto.url}
// //                     alt={selectedPhoto.name}
// //                     className="w-full max-h-96 object-contain"
// //                     onError={() => typeof selectedPhoto.id === 'number' && handleImageError(selectedPhoto.id)}
// //                   />
// //                 )}
// //               </div>

// //               {/* Info Grid */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div className="space-y-4">
// //                   <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
// //                     <div className="p-3 bg-purple-500 rounded-lg mr-4">
// //                       <HardDrive size={20} className="text-white" />
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-purple-600 font-medium">File Size</p>
// //                       <p className="text-lg font-bold text-purple-800">{formatFileSize(selectedPhoto.size)}</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
// //                     <div className="p-3 bg-blue-500 rounded-lg mr-4">
// //                       <Eye size={20} className="text-white" />
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-blue-600 font-medium">Total Views</p>
// //                       <p className="text-lg font-bold text-blue-800">{selectedPhoto.countViews}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-4">
// //                   <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
// //                     <div className="p-3 bg-green-500 rounded-lg mr-4">
// //                       <User size={20} className="text-white" />
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-green-600 font-medium">Shared By</p>
// //                       <p className="text-lg font-bold text-green-800">User #{selectedPhoto.userId}</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
// //                     <div className="p-3 bg-orange-500 rounded-lg mr-4">
// //                       <Calendar size={20} className="text-white" />
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-orange-600 font-medium">Created</p>
// //                       <p className="text-lg font-bold text-orange-800">
// //                         {new Date(selectedPhoto.createdAt ?? '').toLocaleDateString()}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Tags */}
// //               {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
// //                 <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
// //                   <h3 className="text-lg font-bold text-gray-800 mb-3">Tags</h3>
// //                   <div className="flex flex-wrap gap-2">
// //                     {selectedPhoto.tags.map((tag, index) => (
// //                       <span
// //                         key={index}
// //                         className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow"
// //                       >
// //                         #{tag.name}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Action Buttons */}
// //               <div className="mt-6 flex flex-wrap gap-3">
// //                 <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md">
// //                   <Heart size={18} />
// //                   <span>Like</span>
// //                 </button>
// //                 <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-md">
// //                   <Share2 size={18} />
// //                   <span>Share</span>
// //                 </button>
// //                 <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-md">
// //                   <Download size={18} />
// //                   <span>Download</span>
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SharedPhotos;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Eye, Calendar, HardDrive, User, X, Heart, Share2, Download, ZoomIn } from 'lucide-react';
// import { clearMessage, getSharedPhotos } from '../slices/photoSlice'; // Ensure this path is correct
// import { AppDispatch } from '../store/store'; // Ensure this path is correct
// import { Photo } from '../types/photo'; // Ensure this path is correct and Photo type is defined as expected

// // Helper function to determine column count for Masonry layout
// const getColumnCount = () => {
//   if (typeof window !== 'undefined') {
//     if (window.innerWidth > 1200) return 4;
//     if (window.innerWidth > 768) return 3;
//     if (window.innerWidth > 480) return 2;
//   }
//   return 1; // Default for SSR or environments without window
// };

// // MasonryLayout Component
// const MasonryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [columns, setColumns] = useState(getColumnCount());

//   useEffect(() => {
//     const handleResize = () => {
//       setColumns(getColumnCount());
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial call
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div
//       className="w-full"
//       style={{
//         columnCount: columns,
//         columnGap: '1rem',
//         columnFill: 'balance',
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// // Main SharedPhotos Component
// const SharedPhotos = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   // Selecting state from Redux store
//   const { sharedPhotos, loading, msg } = useSelector(
//     (state: { photo: { sharedPhotos: Photo[]; loading: boolean; msg: string | null } }) => state.photo
//   );

//   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
//   const [imageLoadError, setImageLoadError] = useState<{ [key: string]: boolean }>({}); // Use string for key if photo.id can be string
//   const [hoveredPhoto, setHoveredPhoto] = useState<string | number | null>(null); // photo.id can be number or string
//   const [likedPhotos, setLikedPhotos] = useState<Set<string | number>>(new Set()); // photo.id can be number or string

//   // Assuming token and userId are correctly managed elsewhere (e.g., auth context or Redux user slice)
//   // For demonstration, using sessionStorage and a placeholder for userId if not in Redux
//   const token = sessionStorage.getItem("token") || "";
//   const userId = useSelector((state: { user: { user: { id: number } } }) => state.user.user.id) as number;

//   useEffect(() => {
//     if (token && typeof userId === 'number' && !isNaN(userId)) { // Only dispatch if token and a valid userId exist
//       dispatch(getSharedPhotos({ token, userId }));
//     }
//     // Clear message on component mount or when dependencies change
//     // Consider if clearMessage should be called elsewhere, e.g., after displaying the message
//     return () => { // Cleanup function
//         dispatch(clearMessage());
//     }
//   }, [dispatch, token, userId]);

//   const handleImageError = (photoId: string | number) => {
//     setImageLoadError(prev => ({ ...prev, [String(photoId)]: true }));
//   };

//   const formatFileSize = (bytes: number | undefined) => {
//     if (bytes === undefined || bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const openModal = (photo: Photo) => {
//     setSelectedPhoto(photo);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeModal = () => {
//     setSelectedPhoto(null);
//     document.body.style.overflow = 'unset';
//   };

//   const toggleLike = (photoId: string | number) => {
//     setLikedPhotos(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(photoId)) {
//         newSet.delete(photoId);
//       } else {
//         newSet.add(photoId);
//       }
//       return newSet;
//     });
//   };

//   // Loading state from Redux
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mb-4 mx-auto"></div>
//             <div className="absolute inset-0 w-16 h-16 border-4 border-pink-200 rounded-full animate-spin border-t-pink-600 m-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
//           </div>
//           <p className="text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Loading shared photos...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Error message from Redux
//   if (msg && (msg.includes('Failed') || msg.includes('Error'))) { // Broader check for error messages
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
//         <div className="text-center p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-red-200/50 shadow-xl max-w-md">
//             <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center">
//                 <X size={36} className="text-white" /> {/* Error Icon */}
//             </div>
//             <h3 className="text-2xl font-bold text-red-700 mb-2">Oops! Something went wrong.</h3>
//             <p className="text-red-600">{msg}</p>
//             <button 
//                 onClick={() => {
//                     if (token && typeof userId === 'number' && !isNaN(userId)) {
//                         dispatch(getSharedPhotos({ token, userId }));
//                     }
//                 }}
//                 className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//             >
//                 Try Again
//             </button>
//         </div>
//       </div>
//     );
//   }
  
//   // No photos state from Redux
//   if (!sharedPhotos || sharedPhotos.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
//         <div className="text-center p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
//           <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//             <Eye size={40} className="text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">No shared photos yet</h3>
//           <p className="text-gray-600">Photos shared with you will appear here like magic ✨</p>
//         </div>
//       </div>
//     );
//   }

//   // Main content display
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
//       {/* Header */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-pink-600/90 backdrop-blur-sm">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="relative container mx-auto px-6 py-16">
//           <div className="text-center">
//             <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
//               Shared <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Memories</span>
//             </h1>
//             <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
//               Discover beautiful moments shared by your community
//             </p>
//             <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 text-white/80">
//               <div className="flex items-center space-x-2">
//                 <Eye size={20} />
//                 <span>{sharedPhotos.reduce((sum, photo) => sum + (photo.countViews || 0), 0)} total views</span>
//               </div>
//               <div className="hidden sm:block w-1 h-1 bg-white/60 rounded-full"></div>
//               <div className="flex items-center space-x-2">
//                 <HardDrive size={20} />
//                 <span>{sharedPhotos.length} photos</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
//       </div>

//       {/* Photo Masonry Grid */}
//       <div className="container mx-auto px-4 sm:px-6 py-12">
//         <div className="max-w-7xl mx-auto">
//           <MasonryLayout>
//             {sharedPhotos.map((photo, index) => (
//               <div
//                 key={photo.id ? String(photo.id) : `photo-${index}`} // Use photo.id if available, ensure it's a string
//                 className="break-inside-avoid mb-6 group cursor-pointer animate-fadeIn"
//                 style={{ animationDelay: `${index * 100}ms` }}
//                 onMouseEnter={() => photo.id !== undefined ? setHoveredPhoto(photo.id) : setHoveredPhoto(null)}
//                 onMouseLeave={() => setHoveredPhoto(null)}
//                 onClick={() => openModal(photo)}
//               >
//                 <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
//                   {/* Image Container */}
//                   <div className="relative overflow-hidden">
//                     {photo.id !== undefined && imageLoadError[String(photo.id)] ? (
//                       <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-2xl">
//                         <div className="text-center text-gray-500">
//                           <HardDrive size={32} className="mx-auto mb-2 opacity-50" />
//                           <span className="text-sm">Image unavailable</span>
//                         </div>
//                       </div>
//                     ) : (
//                       <img
//                         src={photo.url}
//                         alt={photo.name}
//                         className="w-full h-auto object-cover block"
//                         onError={() => photo.id !== undefined && handleImageError(photo.id)}
//                       />
//                     )}
                    
//                     {/* Overlay */}
//                     {photo.id !== undefined && (
//                         <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${hoveredPhoto === photo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
//                         <div className="absolute bottom-4 left-4 right-4">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   if (photo.id !== undefined) { // Check if photo.id is defined
//                                     toggleLike(photo.id);
//                                   }
//                                 }}
//                                 className="p-2.5 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
//                                 aria-label="Like photo"
//                               >
//                                 <Heart 
//                                   size={18} 
//                                   className={`${photo.id !== undefined && likedPhotos.has(photo.id) ? 'text-red-400 fill-current' : 'text-white'} transition-colors`} 
//                                 />
//                               </button>
//                               <button 
//                                 onClick={(e) => e.stopPropagation()} 
//                                 className="p-2.5 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
//                                 aria-label="Share photo"
//                               >
//                                 <Share2 size={18} className="text-white" />
//                               </button>
//                             </div>
//                             <button 
//                                 onClick={(e) => {e.stopPropagation(); openModal(photo);}}
//                                 className="p-2.5 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
//                                 aria-label="Zoom in on photo"
//                             >
//                               <ZoomIn size={18} className="text-white" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Card Content */}
//                   <div className="p-5">
//                     <h3 className="font-bold text-gray-800 text-lg mb-2 truncate group-hover:text-purple-600 transition-colors">
//                       {photo.name}
//                     </h3>
                    
//                     <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-1">
//                           <Eye size={14} className="text-purple-500" />
//                           <span className="font-medium">{photo.countViews || 0}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <HardDrive size={14} className="text-blue-500" />
//                           <span>{formatFileSize(photo.size)}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Tags */}
//                     {photo.tags && photo.tags.length > 0 && (
//                       <div className="flex flex-wrap gap-1.5">
//                         {photo.tags.slice(0, 3).map((tag, tagIndex) => (
//                           <span
//                             key={tagIndex}
//                             className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200/50"
//                           >
//                             #{tag.name}
//                           </span>
//                         ))}
//                         {photo.tags.length > 3 && (
//                           <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                             +{photo.tags.length - 3}
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </MasonryLayout>
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedPhoto && (
//         <div 
//           className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
//           onClick={closeModal} // Close modal on overlay click
//         >
//           <div 
//             className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 animate-slideUp"
//             onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
//           >
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
//               <div>
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedPhoto.name}</h2>
//                 <p className="text-sm text-gray-600 mt-1">Shared by User #{String(selectedPhoto.userId)}</p>
//               </div>
//               <button
//                 onClick={closeModal}
//                 className="p-2 sm:p-3 bg-white/80 hover:bg-white rounded-full transition-colors shadow-md"
//                 aria-label="Close modal"
//               >
//                 <X size={20} className="text-gray-600" />
//               </button>
//             </div>

//             <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
//               {/* Image */}
//               <div className="mb-6 rounded-2xl overflow-hidden bg-gray-50">
//                 {selectedPhoto.id !== undefined && imageLoadError[String(selectedPhoto.id)] ? (
//                   <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                     <div className="text-center text-gray-500">
//                       <HardDrive size={48} className="mx-auto mb-3 opacity-50" />
//                       <span className="text-lg">Image unavailable</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <img
//                     src={selectedPhoto.url}
//                     alt={selectedPhoto.name}
//                     className="w-full max-h-[50vh] object-contain"
//                     onError={() => selectedPhoto.id !== undefined && handleImageError(selectedPhoto.id)}
//                   />
//                 )}
//               </div>

//               {/* Info Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 {[
//                   { icon: HardDrive, label: "File Size", value: formatFileSize(selectedPhoto.size), color: "purple" },
//                   { icon: Eye, label: "Total Views", value: selectedPhoto.countViews || 0, color: "blue" },
//                   { icon: User, label: "Shared By", value: `User #${String(selectedPhoto.userId)}`, color: "green" },
//                   { icon: Calendar, label: "Created", value: selectedPhoto.createdAt ? new Date(selectedPhoto.createdAt).toLocaleDateString() : 'N/A', color: "orange" }
//                 ].map(item => (
//                   <div key={item.label} className={`flex items-center p-4 bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 rounded-xl`}>
//                     <div className={`p-3 bg-${item.color}-500 rounded-lg mr-4`}>
//                       <item.icon size={20} className="text-white" />
//                     </div>
//                     <div>
//                       <p className={`text-sm text-${item.color}-600 font-medium`}>{item.label}</p>
//                       <p className={`text-lg font-bold text-${item.color}-800`}>{item.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Tags */}
//               {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
//                 <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
//                   <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-3">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedPhoto.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow"
//                       >
//                         #{tag.name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
//                  <button 
//                     onClick={() => selectedPhoto.id !== undefined && toggleLike(selectedPhoto.id)}
//                     className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 shadow-md text-sm font-medium ${selectedPhoto.id !== undefined && likedPhotos.has(selectedPhoto.id) ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'}`}
//                 >
//                     <Heart size={18} className={selectedPhoto.id !== undefined && likedPhotos.has(selectedPhoto.id) ? 'fill-current' : ''} />
//                     <span>{selectedPhoto.id !== undefined && likedPhotos.has(selectedPhoto.id) ? 'Liked' : 'Like'}</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-md text-sm font-medium">
//                   <Share2 size={18} />
//                   <span>Share</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-md text-sm font-medium">
//                   <Download size={18} />
//                   <span>Download</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Basic CSS for animations if not using a global stylesheet */}
//       <style>
//         {`
//           .animate-fadeIn {
//             animation: fadeIn 0.5s ease-out forwards;
//           }
//           .animate-slideUp {
//             animation: slideUp 0.3s ease-out forwards;
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes slideUp {
//             from { opacity: 0.8; transform: translateY(20px) scale(0.98); }
//             to { opacity: 1; transform: translateY(0) scale(1); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default SharedPhotos;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Grid,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import { Masonry } from '@mui/lab';
import {
  ZoomIn as ZoomInIcon,
  Share as ShareIcon,
  Info as InfoIcon,
  Tag as TagIcon,
  Visibility as ViewIcon,
  CalendarToday as CalendarIcon,
  Storage as StorageIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Download as DownloadIcon,
  PhotoLibrary as PhotoLibraryIcon
} from '@mui/icons-material';
import { clearMessage, getSharedPhotos } from '../../slices/photoSlice';
import { AppDispatch } from '../../store/store';
import { Photo } from '../../types/photo';

// SharedPhotoCard Component
interface SharedPhotoCardProps {
  photo: Photo;
  onOpenLightbox: (photo: Photo) => void;
  isLiked: boolean;
  onToggleLike: (photoId: string | number) => void;
}

const SharedPhotoCard: React.FC<SharedPhotoCardProps> = ({
  photo,
  onOpenLightbox,
  isLiked,
  onToggleLike
}) => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tagsToShow = showAllTags ? photo.tags : photo.tags?.slice(0, 2);
  const hasMoreTags = photo.tags && photo.tags.length > 2;

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {imageError ? (
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <PhotoLibraryIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Image unavailable
              </Typography>
            </Box>
          ) : (
            <CardMedia
              component="img"
              image={photo.url}
              alt={photo.name}
              sx={{
                width: '100%',
                aspectRatio: '1',
                objectFit: 'cover',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => onOpenLightbox(photo)}
              onError={() => setImageError(true)}
            />
          )}

          {/* Zoom overlay button */}
          <IconButton
            onClick={() => onOpenLightbox(photo)}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
              opacity: 0,
              transition: 'opacity 0.3s',
              '.MuiCard-root:hover &': {
                opacity: 1,
              },
            }}
          >
            <ZoomInIcon />
          </IconButton>

          {/* Photo name overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '0.85rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {photo.name}
            </Typography>
          </Box>

          {/* Views counter */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <ViewIcon sx={{ fontSize: '0.8rem', color: 'white' }} />
            <Typography
              variant="caption"
              sx={{ color: 'white', fontSize: '0.75rem' }}
            >
              {photo.countViews || 0}
            </Typography>
          </Box>

          {/* Tags section */}
          {photo.tags && photo.tags.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {tagsToShow?.map((tag, index) => (
                <Chip
                  key={index}
                  icon={<TagIcon sx={{ fontSize: '0.8rem' }} />}
                  label={tag.name}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(76, 175, 80, 0.9)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    '& .MuiChip-icon': {
                      color: 'white',
                    },
                  }}
                />
              ))}
              {hasMoreTags && !showAllTags && (
                <Chip
                  label={`+${photo.tags.length - 2} more`}
                  size="small"
                  clickable
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTags(true);
                  }}
                  sx={{
                    backgroundColor: 'rgba(63, 81, 181, 0.9)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(63, 81, 181, 1)',
                    },
                  }}
                />
              )}
              {showAllTags && hasMoreTags && (
                <Chip
                  label="hide"
                  size="small"
                  clickable
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTags(false);
                  }}
                  sx={{
                    backgroundColor: 'rgba(158, 158, 158, 0.9)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(158, 158, 158, 1)',
                    },
                  }}
                />
              )}
            </Box>
          )}
        </Box>

        <CardActions
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'background.paper',
            p: 1,
          }}
        >
          <Box>
            <Tooltip title="View details">
              <IconButton
                size="small"
                sx={{ color: 'primary.main' }}
                onClick={() => setOpenDetailsModal(true)}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share photo">
              <IconButton
                size="small"
                sx={{ color: 'success.main' }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
              <IconButton
                size="small"
                sx={{ color: isLiked ? 'error.main' : 'text.secondary' }}
                onClick={() => photo.id !== undefined && onToggleLike(photo.id)}
              >
                {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton
                size="small"
                sx={{ color: 'info.main' }}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>

      {/* Photo Details Modal */}
      <Dialog
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" component="div">
            Photo Details
          </Typography>
          <IconButton
            onClick={() => setOpenDetailsModal(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs:12, md:6}}>
              <Box
                component="img"
                src={photo.url}
                alt={photo.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                onError={() => setImageError(true)}
              />
            </Grid>
            <Grid size={{ xs:12, md:6}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {photo.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ViewIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Views: {photo.countViews?.toLocaleString() || 0}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorageIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    File size: {formatFileSize(photo.size)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Shared by: User #{photo.userId}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Created: {formatDate(photo.createdAt)}
                  </Typography>
                </Box>

                {photo.tags && photo.tags.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TagIcon fontSize="small" />
                      Tags ({photo.tags.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {photo.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'success.main',
                            color: 'success.main',
                            '&:hover': {
                              backgroundColor: 'success.light',
                              opacity: 0.1
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={() => setOpenDetailsModal(false)} variant="outlined">
            Close
          </Button>
          <Button
            onClick={() => onOpenLightbox(photo)}
            variant="contained"
            startIcon={<ZoomInIcon />}
          >
            View Fullscreen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Main SharedPhotos Component
const SharedPhotos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sharedPhotos, loading, msg } = useSelector(
    (state: { photo: { sharedPhotos: Photo[]; loading: boolean; msg: string | null } }) => state.photo
  );

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<string | number>>(new Set());

  const token = sessionStorage.getItem("token") || "";
  const userId = useSelector((state: { user: { user: { id: number } } }) => state.user.user.id) as number;

  useEffect(() => {
    if (token && typeof userId === 'number' && !isNaN(userId)) {
      dispatch(getSharedPhotos({ token, userId }));
    }
    return () => {
      dispatch(clearMessage());
    }
  }, [dispatch, token, userId]);

  const handleOpenLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  const toggleLike = (photoId: string | number) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Loading shared photos...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Error state
  if (msg && (msg.includes('Failed') || msg.includes('Error'))) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => {
                if (token && typeof userId === 'number' && !isNaN(userId)) {
                  dispatch(getSharedPhotos({ token, userId }));
                }
              }}
            >
              Try Again
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          {msg}
        </Alert>
      </Container>
    );
  }

  // No photos state
  if (!sharedPhotos || sharedPhotos.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <PhotoLibraryIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.primary">
            No shared photos yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Photos shared with you will appear here ✨
          </Typography>
        </Box>
      </Container>
    );
  }

  // Main content
  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Shared Memories
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Discover beautiful moments shared by your community
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ViewIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              {sharedPhotos.reduce((sum, photo) => sum + (photo.countViews || 0), 0)} total views
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhotoLibraryIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              {sharedPhotos.length} photos
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Photos Grid */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        {sharedPhotos.map((photo, index) => (
          <SharedPhotoCard
            key={photo.id ? String(photo.id) : `photo-${index}`}
            photo={photo}
            onOpenLightbox={handleOpenLightbox}
            isLiked={photo.id !== undefined ? likedPhotos.has(photo.id) : false}
            onToggleLike={toggleLike}
          />
        ))}
      </Masonry>

      {/* Lightbox Modal - You'll need to implement PhotoLightbox component */}
      {selectedPhoto && (
        <Dialog
          open={openLightbox}
          onClose={handleCloseLightbox}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              borderRadius: 0,
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '90vh',
              p: 2
            }}
          >
            <IconButton
              onClick={handleCloseLightbox}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            />
          </Box>
        </Dialog>
      )}
    </Container>
  );
};

export default SharedPhotos;
