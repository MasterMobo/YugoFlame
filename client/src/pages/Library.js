import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

function Library() {
    const {
        setSearchVal,
        setPage,
        cards,
        isLoading,
        isRefetching,
        getCards,
        error,
    } = useSearchLibrary("");

    return (
        <div className="library">
            <SearchBar
                setSearchVal={setSearchVal}
                getCards={getCards}
                setPage={setPage}
            />
            <CardsList
                cards={cards}
                isLoading={isLoading}
                isRefetching={isRefetching}
                error={error}
            />
            <PageBar
                cards={cards}
                isLoading={isLoading}
                isRefetching={isRefetching}
                setPage={setPage}
                getCards={getCards}
            />
        </div>
    );
}

const SearchBar = (props) => {
    return (
        <div className="search-bar">
            <input
                onChange={(event) => props.setSearchVal(event.target.value)}
            ></input>
            <button
                onClick={() => {
                    props.getCards();
                }}
            >
                Search
            </button>
        </div>
    );
};

const CardsList = (props) => {
    if (props.isLoading || props.isRefetching) {
        return <h2>Loading...</h2>;
    }

    if (props.error) {
        return <h2>Something went wrong, please try again later.</h2>;
    }

    return (
        <div className="cards-list">
            {props.cards?.data.map((card, key) => {
                return <Card key={key} card={card} />;
            })}
        </div>
    );
};

const Card = (props) => {
    return (
        <div className="card">
            <img src={props.card.card_images[0].image_url} alt="card-img" />
        </div>
    );
};

const PageBar = (props) => {
    if (props.isLoading || props.isRefetching) {
        return;
    }
    const currentPage = props.cards.page;
    const totalPages = props.cards.totalPages;
    const showPages = [];
    for (let i = -2; i <= 2; i++) {
        if (currentPage + i <= 0 || currentPage + i > totalPages) {
            continue;
        }
        showPages.push(currentPage + i);
    }
    if (showPages[0] !== 1) {
        showPages.unshift("...");
        showPages.unshift(1);
    }
    if (showPages[showPages.length - 1] !== totalPages) {
        showPages.push("...");
        showPages.push(totalPages);
    }
    return (
        <div className="page-bar">
            {showPages.map((pageNum, key) => {
                if (pageNum === "...") {
                    return <p>...</p>;
                }

                if (pageNum === currentPage) {
                    return (
                        <button key={key} id="current-page">
                            {pageNum}
                        </button>
                    );
                }

                return (
                    <button
                        key={key}
                        onMouseOver={() => {
                            props.setPage(pageNum);
                        }}
                        onClick={() => {
                            props.getCards();
                        }}
                    >
                        {pageNum}
                    </button>
                );
            })}
        </div>
    );
};

const useSearchLibrary = () => {
    const [query, setQuery] = useState({
        name: "",
        page: 1,
    });

    const setSearchVal = (val) => {
        setQuery({ ...query, name: val, page: 1 });
    };

    const setPage = (pageNum) => {
        setQuery({ ...query, page: pageNum });
    };

    const {
        data: cards,
        isLoading,
        isRefetching,
        error,
        refetch: getCards,
    } = useQuery(
        ["card"],
        async () => {
            const response = await axios.get(
                `http://localhost:5000/api/v1/library`,
                {
                    params: {
                        name: query.name,
                        page: query.page,
                    },
                }
            );
            console.log(response.data);
            return response.data;
        },
        { refetchOnWindowFocus: false }
    );

    return {
        setSearchVal,
        setPage,
        cards,
        isLoading,
        isRefetching,
        error,
        getCards,
    };
};
export default Library;
