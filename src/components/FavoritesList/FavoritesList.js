import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteContact from "../FavoriteContacts/FavoriteContact";
import { selectContact } from "../../store/contacts";

function FavoritesList() {
    const dispatch = useDispatch();
    const [slidePosition, setSlidePosition] = useState(0);
    const [currentSlideSelected, setCurrentSlideSelected] = useState(0);
    const favorites = useSelector(state => state.contacts.favoriteContacts);
    const selectedContact = useSelector(state => state.contacts.selectedContact);

    console.log('slide selected', currentSlideSelected)
    console.log('slide position', slidePosition)

    const leftClick = () => {
        const currentIdx = favorites.indexOf(selectedContact);
        const prevContact = favorites[currentIdx - 1];
        if (slidePosition > 0) {
            setSlidePosition(slidePosition => slidePosition -= 1)
        }
        if (prevContact) {
            dispatch(selectContact(favorites[currentIdx - 1]));
            setCurrentSlideSelected(currentIdx - 1);
        }
        return;
    }

    const rightClick = () => {
        const currentIdx = favorites.indexOf(selectedContact);
        const nextContact = favorites[currentIdx + 1];
        if (currentIdx > 0) {
            setSlidePosition(slidePosition => slidePosition += 1)
        }
        if (nextContact) {
            dispatch(selectContact(favorites[currentIdx + 1]));
            setCurrentSlideSelected(currentIdx + 1);
        }
        return;
    }

    useEffect(() => {
        // Must compare a copy of favorite because the selectedContact object is not deeply equal to
        let selectedContactCopy = favorites.find(favorite => {
            return selectedContact.name.last === favorite.name.last && selectedContact.name.first === favorite.name.first;
        })

        let index = selectedContactCopy ? favorites.indexOf(selectedContactCopy) : -1;
        console.log(index);

        if (index > -1) {
            setCurrentSlideSelected(index);
            if (index > 0) {
                setSlidePosition(index - 1);
            } else {
                setSlidePosition(0);
            }
        }
    }, [selectedContact])

    return (
        <div id='favorites-block'>
            <i className="bi bi-star-fill favorite static" style={{ 'fontSize': '30px' }}></i>
            <div id='favorites-scroll-container'>
                <button
                    onClick={leftClick}
                    className='carousel-button'
                    style={{ visibility: currentSlideSelected > 0 ? 'visible' : 'hidden' }}
                >
                    &#60;
                </button>
                <div id='favorites-carousel'>
                    <div id='favorites-track'
                        style={{ 'transform': `translateX(-${slidePosition * 120}px)`}}>
                        {favorites.length > 0 && favorites.map((contact, idx) => (
                            <FavoriteContact contact={contact} key={idx} />
                        ))}
                        {favorites.length === 0 && (
                            <p>Tip: Favorite contacts for quick access.</p>
                        )}

                    </div>
                </div>
                <button
                    onClick={rightClick}
                    className='carousel-button'
                    style={{ visibility: currentSlideSelected < favorites.length - 1 ? 'visible' : 'hidden' }}
                >
                    &#62;
                </button>
            </div>
        </div>
    )
}

export default FavoritesList;
