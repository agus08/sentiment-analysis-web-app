# Disaster Sentiment Analysis Web App

A web application that enables users to explore disaster-related topics and analyze their sentiment in real-time. Built with Next.js, Supabase, and Tailwind CSS, the app allows users to search for topics, view sentiment analysis results, and leverage an autocomplete search powered by dynamic keyword suggestions.

## Table of Contents
- [Project Overview](#project-overview)
- [Approach](#approach)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Features](#features)
- [Future Improvements](#future-improvements)

---

## Project Overview

This application is designed to give users insights into how various disaster topics are perceived based on sentiment analysis. The app provides real-time sentiment analysis powered by Hugging Face’s `distilbert-base-uncased-finetuned-sst-2-english` model, with a user-friendly interface for searching and exploring relevant disaster-related keywords.

## Approach

The primary focus of this project was to deliver a performant and scalable web application with a smooth user experience. My approach was to:

1. **Implement SSR for Performance**: By using Next.js’s Server Actions and Server-Side Rendering (SSR), fetch sentiment data server-side, providing faster loading and improved security.
2. **Dynamic Autocomplete Functionality**: The app includes an autocomplete input with keyword suggestions from Supabase, enabling users to search and select topics seamlessly. This feature is debounced to prevent unnecessary API calls.
3. **Real-time Sentiment Analysis**: Integrated with Hugging Face’s API, the app analyzes the sentiment of selected topics and displays results using an intuitive color-coded scheme.

## Tech Stack & Libraries

### Core Libraries and Frameworks

- **Next.js (15)**: For SSR, routing, and efficient API handling. The App Router simplifies server-side data fetching and allows for cleaner code organization.
- **Supabase**: Serves as the primary data layer for storing and fetching disaster-related keywords and user-specific data. Given that access to the X API (formerly Twitter API) was unavailable, I uploaded a dataset from Kaggle to Supabase, allowing for a quick and reliable backend setup. Supabase was chosen because:
    - It provides a backendless, scalable API solution that can be quickly deployed and accessed.
    - It includes real-time data handling, which is ideal for our application’s dynamic data needs.
    - The SQL database structure allows for powerful querying, ideal for building complex data relationships and efficient searches.
- **Tailwind CSS**: Provides utility-first CSS for responsive design and consistent styling, speeding up the design process.
- **Framer Motion**: Adds animations and micro-interactions to the UI, enhancing the overall user experience.
- **Hugging Face API**: Powers the sentiment analysis feature, utilizing a fine-tuned model (`distilbert-base-uncased-finetuned-sst-2-english`) for accurate and efficient text analysis.

## Features

1. **Search and Autocomplete**: 
   - Users can type keywords related to disasters to get real-time autocomplete suggestions powered by Supabase.
   - Input is debounced to limit API calls and reduce performance load.

2. **Sentiment Analysis**:
   - Users can select a keyword to view the sentiment associated with the topic. The app highlights sentiment in a color-coded format (green for positive, orange for neutral, red for negative).
   - Sentiment data is fetched from Hugging Face’s model using Server Actions, ensuring that the analysis is done server-side for quick access.

3. **Responsive Design**:
   - Styled with Tailwind CSS, the app is responsive and mobile-friendly, making it accessible across all device sizes.

## Future Improvements

With more time, I would consider implementing the following enhancements:

1. **Infinite Scroll Pagination**:
   - Implement infinite scrolling for search results to improve user experience and performance, especially when dealing with large datasets.

2. **Frequent Topics Listing**:
   - Create a dynamic listing of frequently searched or popular disaster topics. This feature would allow users to easily discover trending topics and view relevant sentiment analyses without needing to type in a search query.

3. **Progressive Web App (PWA)**:
   - Enable PWA capabilities to allow offline access and push notifications. This enhancement would improve user engagement and accessibility, particularly for mobile users who might want to access sentiment data and trending topics even without an internet connection.

