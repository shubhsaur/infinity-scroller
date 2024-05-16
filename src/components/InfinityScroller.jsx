import React, { useCallback, useRef, useState, useEffect } from 'react';
import { fetchWithAbortController } from '../service';
import { ProgressSpinner } from 'primereact/progressspinner';

const InfinityScroller = ({ query, renderListItem }) => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const observer = useRef(null);

    const { fetchedData, isLoading } = fetchWithAbortController(query, page);

    useEffect(() => {
        setItems([]);
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (fetchedData && fetchedData.length > 0) {
            setItems((prevItems) => [...prevItems, ...fetchedData]);
        }
    }, [fetchedData]);

    const lastElementObserver = useCallback(node => {
        if (isLoading) return;
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading]);

    const renderList = useCallback(() => {
        return items.map((item, index) => {
            if (index === items.length - 1) return renderListItem(item, index, lastElementObserver);
            return renderListItem(item, index, null);
        });
    }, [items, lastElementObserver, renderListItem]);

    return (
        <div className='list-container'>
            {renderList()}
            {isLoading && <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="8" animationDuration=".5s" />}
        </div>
    );
};

export default InfinityScroller;
