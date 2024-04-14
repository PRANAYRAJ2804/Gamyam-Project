import React, { useState, useEffect } from "react";
import "./Home.css";
import CarouselCard from "../Carousel/CarouselCard";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${page}&page_size=10`
        );
        const data = await response.json();
        setRecords((prevRecords) => [...prevRecords, ...data.results]);
        setLoading(false);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const loadData = () => {
      if (loading) return;
      fetchData();
    };

    const loadInitialData = () => {
      setTimeout(() => {
        setLoading(false);
        loadData();
      }, 2000);
    };

    loadInitialData();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading
      ) {
        setLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <>
      <div className="home_section">
        {records.map((details, index) => (
          <>
            <CarouselCard
              key={index}
              images={details.land_media.map((media) => media.image)}
              village_name={details.village_name}
              mandal_name={details.mandal_name}
              district_name={details.district_name}
              acres={details.total_land_size_in_acres.acres}
              guntas={details.total_land_size_in_acres.guntas}
              price1={details.price_per_acre_crore.crore}
              price2={details.price_per_acre_crore.lakh}
            />
          </>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default Home;
