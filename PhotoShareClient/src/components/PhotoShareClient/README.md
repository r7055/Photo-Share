# PhotoShare Client

## Overview
PhotoShare Client is a web application that allows users to manage their photo albums and recycle bin. Users can restore or permanently delete albums and photos that have been removed.

## Components
- **RecycleBinAlbums.tsx**: Displays the albums that have been deleted. Users can restore or delete these albums permanently.
- **RecycleBinPhotos.tsx**: A new component that displays the photos that have been deleted, similar to how albums are displayed.
- **RecycleBinContainer.tsx**: Manages the state and logic for displaying either albums or photos in the recycle bin.

## Redux Slice
- **albumSlice.ts**: Contains the Redux slice for managing the state related to albums, including actions for fetching, restoring, and deleting albums and photos.

## Store
- **store.ts**: Sets up the Redux store for the application, integrating the slices and middleware.

## Types
- **album.ts**: Defines the TypeScript types and interfaces related to albums and photos.

## Configuration
- **tsconfig.json**: Configuration file for TypeScript, specifying compiler options and files to include in the compilation.
- **package.json**: Configuration file for npm, listing the dependencies and scripts for the project.

## Installation
To install the project, run the following command in the project directory:
```
npm install
```

## Usage
To start the development server, use:
```
npm start
```

## Future Improvements
- Implement user authentication and authorization.
- Add more features for photo editing and sharing.
- Improve the UI/UX for better user experience.

## License
This project is licensed under the MIT License.