import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import PropertyGrid from "../components/PropertyGrid.jsx";
import useProperties from "../hooks/useProperties.js";
import useFilters from "../hooks/useFilters.js";

export default function Explore() {
  const [q] = useSearchParams();
  const { properties, loading, error, refetch } = useProperties();
  const { filters, setFilter, resetFilters, filteredProperties } =
    useFilters(properties);

  // Apply search-panel values to the visible filter state.
  useEffect(() => {
    const location = q.get("location") || "";
    const maxRent = q.get("maxRent") || "15000";
    const roomType = q.get("roomType") || "";

    setFilter("location", location);
    setFilter("maxRent", maxRent);
    setFilter("roomType", roomType);
  }, [q]);

  const shown = filteredProperties;

  return (
    <>
      <Navbar />
      <main className="explore-page container">
        <div className="explore-head">
          <div>
            <span className="eyebrow">DISCOVER</span>
            <h1>
              Find your <em>basera.</em>
            </h1>
            <p>Places that fit your budget, lifestyle and trust.</p>
          </div>
        </div>

        <div className="explore-layout">
          <FilterPanel
            filters={filters}
            setFilter={setFilter}
            resetFilters={resetFilters}
          />

          <div className="results">
            <div className="results-bar">
              <b>{loading ? "Finding stays..." : `${shown.length} stays`}</b>
              <span>Sorted by trust &amp; relevance</span>
            </div>

            {error ? (
              <div className="empty">
                <h3>We couldn't load the stays.</h3>
                <button className="btn" onClick={refetch}>
                  Retry
                </button>
              </div>
            ) : (
              <PropertyGrid properties={shown} loading={loading} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
