import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteContact from "../FavoriteContacts/FavoriteContact";
import { selectContact } from "../../store/contacts";
import './FavoritesList.scss'

function FavoritesList() {
    const dispatch = useDispatch();
    const [slidePosition, setSlidePosition] = useState(0);
    const [currentSelectedIdx, setCurrentSelectedIdx] = useState(0);
    const favorites = useSelector(state => state.contacts.favoriteContacts);
    const selectedContact = useSelector(state => state.contacts.selectedContact);

    // Helper function to find index of a selectedContact in favorites
    const findCurrentSelectedIdx = (favorites, selectedContact) => {
        // Must compare using a copy of favorites because indexOf will not work with objects (not deeply equal)
        if (Object.keys(selectedContact).length === 0) return -1;

        let selectedContactCopy = favorites.find(favorite => {
            return selectedContact.name.last === favorite.name.last && selectedContact.name.first === favorite.name.first;
        })
        return favorites.indexOf(selectedContactCopy);
    }


    const leftClick = () => {
        const currentIdx = findCurrentSelectedIdx(favorites, selectedContact)
        const prevContact = favorites[currentIdx - 1];

        // If the currently selected user is not in favorites and someone clicks left, go to beginning of favorites.
        if (currentIdx === -1) {
            setSlidePosition(0);
            dispatch(selectContact(favorites[0]));
        }

        if (prevContact) {
            dispatch(selectContact(favorites[currentIdx - 1]));
        }

        return;
    }

    const rightClick = () => {
        const currentIdx = findCurrentSelectedIdx(favorites, selectedContact)
        const nextContact = favorites[currentIdx + 1];

        // If the currently selected user is not in favorites and someone clicks right, go to beginning of favorites.
        if (currentIdx === -1) {
            setSlidePosition(0);
            dispatch(selectContact(favorites[0]));
        }

        if (nextContact) {
            dispatch(selectContact(favorites[currentIdx + 1]));
        }

        return;
    }

    useEffect(() => {
        const selectedIdx = findCurrentSelectedIdx(favorites, selectedContact)
        setCurrentSelectedIdx(selectedIdx);

        // If this person doesn't exist in favorites:
        if (selectedIdx > -1) {
            if (selectedIdx > 0 && selectedIdx + 4 <= favorites?.length) {
                // Prevent slide from moving if we are seeing the last 5 favorites in the list.
                setSlidePosition(selectedIdx - 1);
            } else if (selectedIdx === 0) {
                // Resets slide to 0 if user is first in list.
                setSlidePosition(0)
            } else if (favorites.length - 4 > slidePosition) {
                // Resets slide to an optimal position if a user is selected and the slide position is not typical (i.e. not already favorites.length - 5)
                let newPos = favorites.length - 5 > 0 ? favorites.length - 5 : 0;
                setSlidePosition(newPos);
            }
        }
    }, [selectedContact, slidePosition, favorites])

    return (
        <div id='favorites-block'>
            <div id='your-favorites'>
                <i className="bi bi-star-fill favorite static" style={{ 'fontSize': '24px' }}></i>
                <h3>Favorites</h3>
            </div>
            <div id='favorites-scroll-container'>
                <button
                    onClick={leftClick}
                    className={currentSelectedIdx > 0 ? 'carousel-button' : 'carousel-button inactive'}
                    style={{ visibility: favorites?.length === 0 ? 'hidden' : 'visible' }}
                    aria-label='Go to previous contact'
                >
                    &#60;
                </button>
                <div id='favorites-carousel'>
                    <div id='favorites-track'
                        style={{ 'transform': `translateX(-${slidePosition * 20}%)` }}>
                        {favorites?.length > 0 && favorites?.map((contact, idx) => (
                            <FavoriteContact contact={contact} key={idx} />
                        ))}
                        {favorites?.length === 0 && (
                            <p id='no-favorites'>Tip: Favorite contacts for quick access.</p>
                        )}

                    </div>
                </div>
                <button
                    onClick={rightClick}
                    className={currentSelectedIdx < favorites?.length - 1 ? 'carousel-button' : 'carousel-button inactive'}
                    style={{ visibility: favorites?.length === 0 ? 'hidden' : 'visible' }}
                    aria-label='Go to next contact'
                >
                    &#62;
                </button>
            </div>
        </div>
    )
}

export default FavoritesList;
