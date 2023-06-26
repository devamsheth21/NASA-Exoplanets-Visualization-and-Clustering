# Exoplanet Visualization Project

## Homework #4: Innovative Visualization Design

In this homework, I have created a unique visualization that goes beyond the "common chart types" to showcase the NASA Exoplanets dataset in an innovative and creative manner. This project was completed as part of an assignment for Data Visualization at Arizona State University.

## Overview
The goal of this project is to create a visually interesting and informative visualization graphic/infographic exhibit that effectively communicates the NASA Exoplanets dataset to museum visitors. The visualization provides an interactive scatter plot of exoplanets' orbital radii, allowing users to explore different clusters and their characteristics.

## Features
- Interactive Scatter Plot: Visualizes exoplanets as data points on a scatter plot, where each point represents an exoplanet. The position of the point corresponds to the orbital radius of the planet.
- Clustering: Utilizes k-means clustering algorithm to group exoplanets based on their orbital radii into distinct clusters.
- Cluster Selection: Allows users to select a specific cluster to view and explore its corresponding exoplanets.
- Planet Details: Displays additional information about each planet, such as planet type, stellar magnitude, and radius multiplier.
- Dynamic Orbit Highlight: Highlights the orbit of a planet when hovering over its data point on the scatter plot.
- Planet Type Legend: Provides a legend indicating the different planet types and their corresponding icons.
- Bar Chart: Includes a bar chart that shows the count of each planet type, providing insights into the distribution of planet types in the dataset.

## Dataset
The dataset used for this visualization is the NASA Exoplanets dataset. It contains a catalogue of exoplanets discovered by NASA missions, including information such as orbital radii, planet types, stellar magnitudes, and more.

## Technologies Used
- D3.js: JavaScript library for data visualization, used to create the interactive scatter plot, bar chart, and implement dynamic features.
- Python: Used for data preprocessing, clustering, and generating the input data for the visualization.
- K-means Clustering: Algorithm for grouping exoplanets into clusters based on their orbital radii.

## Installation and Setup
1. Clone the repository: `git clone https://github.com/your-username/exoplanet-visualization.git`
2. Go the the repository folder by running "cd Devam-Hitansh-Manan-Niketan-Nihar-Tirth" command.
3. Go the the repository folder by running "cd  NASA-Exoplanets-Visualization-and-Clustering" command.
4. Start python server by running command "python -m http.server". Note: python should be installed for running this command.
5. Open Firefox browser window and go to "localhost:8000".

## Usage
1. Upon launching the application, you will see the scatter plot visualization of exoplanets.
2. Use the cluster selection dropdown to choose a specific cluster and view its exoplanets.
3. Hover over a planet's data point to highlight its orbit and view additional details.
4. Explore the exoplanet data by interacting with the visualization.
5. The bar chart on the side provides insights into the count of each planet type in the dataset.

## Contributing
Contributions to this project are welcome. To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request detailing your changes.


## Acknowledgements
- Prof. Chris Bryan for providing the assignment and opportunity to work on this project.
- NASA for providing the NASA Exoplanets dataset used in this project.

## Contact
For any inquiries or suggestions, please contact devamsheth20@gmail.com.


* NASA Exoplanets ([source](https://www.kaggle.com/datasets/adityamishraml/nasaexoplanets)): This dataset contains a catalogue of exoplanets discovered by NASA missions.
