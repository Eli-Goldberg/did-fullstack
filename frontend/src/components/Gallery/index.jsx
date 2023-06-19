import React from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCard from "../ImageCard";

const fetchImages = async ({ pageParam = 1 }) => {
  const res = await fetch(`API_URL?page=${pageParam}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const ImageGallery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery("images", fetchImages, {
    getNextPageParam: (lastPage, _pages) => lastPage.nextPage ?? false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={data.pages.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.pages.map((group, _i) => (
        <div key={group.id}>
          {group.images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      ))}
      {isFetching && "Fetching more images..."}
    </InfiniteScroll>
  );
};

export default ImageGallery;
