import React, { useState, useEffect, useCallback, useRef } from 'react';
import { List } from 'react-virtualized';
import axios from 'axios';
import './index.css';


const API_BASE_URL = 'http://localhost:5000';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// --- Error Boundary Component ---
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }; 
    }

    // Static method to update state when an error is caught.
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Lifecycle method to log error information.
    componentDidCatch(error, errorInfo) {
        console.error("Caught error:", error, errorInfo);
    }

    // Render method to conditionally render either the children or the fallback UI.
    render() {
        if (this.state.hasError) {
            return (
                <div className="text-red-500 p-4 bg-red-100 border border-red-400 rounded">
                    Something went wrong. Please try refreshing the page.
                </div>
            );
        }

        return this.props.children;
    }
}

// --- Main App Component ---
function App() {
    // --- State ---
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStartChar, setSelectedStartChar] = useState('');
    const [filterText, setFilterText] = useState('');
    const listRef = useRef(null);

    // --- Data Fetching ---
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const startChar = filterText || selectedStartChar;
            const response = await axios.get(`${API_BASE_URL}/users?startChar=${startChar}`);
            setUsers(response.data);

            if (listRef.current) {
                listRef.current.scrollToRow(0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [filterText, selectedStartChar]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    // --- Event Handlers ---
    const handleAlphabetClick = (char) => {
        setSelectedStartChar(char);
        setFilterText('');
    };

    // Handler for changes in the filter input.
    const handleFilterChange = (event) => {
        setFilterText(event.target.value.toUpperCase());
        setSelectedStartChar('');
    };

    // --- Row Renderer ---
    const rowRenderer = ({ key, index, style }) => {
        return (
            <div key={key} style={style} className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100">
                {users[index]} 
            </div>
        );
    };

    // --- JSX Rendering ---
    return (
        <ErrorBoundary>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>

                <div className="flex flex-wrap justify-center mb-4">
                    {alphabet.split('').map((char) => (
                        <button
                            key={char}
                            onClick={() => handleAlphabetClick(char)}
                            className={`px-3 py-1 m-1 border border-gray-300 rounded hover:bg-gray-200 ${selectedStartChar === char ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {char}
                        </button>
                    ))}
                </div>

                {/* List Container */}
                <div className="flex flex-wrap justify-self-center border border-gray-300 rounded overflow-hidden" style={{ width: 400, height: 500 }}>
                    {loading ? (
                        // Display a loading spinner while data is being fetched
                        <div className='flex justify-center items-center w-full h-full'>
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : users.length > 0 ? (
                        <List
                            ref={listRef}
                            width={400}
                            height={500}
                            rowHeight={30}
                            rowRenderer={rowRenderer}
                            rowCount={users.length}
                            overscanRowCount={10}
                        />
                    ) : (
                        <div className="p-4 text-center text-gray-500">No users found.</div>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default App;