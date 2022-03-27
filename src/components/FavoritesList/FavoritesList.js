import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteContact from "../FavoriteContacts/FavoriteContact";
import { selectContact } from "../../store/contacts";
import './FavoritesList.scss'

function FavoritesList() {
    const dispatch = useDispatch();
    const [slidePosition, setSlidePosition] = useState(0);
    const [currentSlideSelected, setCurrentSlideSelected] = useState(0);
    const favorites = useSelector(state => state.contacts.favoriteContacts);
    const selectedContact = useSelector(state => state.contacts.selectedContact);

    const leftClick = () => {
        const currentIdx = favorites.indexOf(selectedContact);
        const prevContact = favorites[currentIdx - 1];

        if (prevContact) {
            dispatch(selectContact(favorites[currentIdx - 1]));
            setCurrentSlideSelected(currentIdx - 1);
        }
        return;
    }

    const rightClick = () => {
        const currentIdx = favorites.indexOf(selectedContact);
        const nextContact = favorites[currentIdx + 1];

        if (currentIdx === -1) {
            setSlidePosition(0);
            dispatch(selectContact(favorites[0]));
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
        setCurrentSlideSelected(index);

        if (index > -1) {
            if (index > 0 && index + 4 <= favorites.length) {
                setSlidePosition(index - 1);
            } else if  (slidePosition === 0 && favorites.length - 4 > 0) {
                index === 0 ? setSlidePosition(0) : setSlidePosition(index - 1);
            }
        } else {
            setSlidePosition(0)
        }
    }, [selectedContact])

    return (
        <div id='favorites-block'>
            <div id='your-favorites'>
                <i className="bi bi-star-fill favorite static" style={{ 'fontSize': '24px' }}></i>
                <h3>Favorites</h3>
            </div>
            <div id='favorites-scroll-container'>
                <button
                    onClick={leftClick}
                    className={currentSlideSelected > 0 ? 'carousel-button' : 'carousel-button inactive' }
                >
                    &#60;
                </button>
                <div id='favorites-carousel'>
                    <div id='favorites-track'
                        style={{ 'transform': `translateX(-${slidePosition * 20}%)`}}>
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
                    className={currentSlideSelected < favorites.length - 1 ? 'carousel-button' : 'carousel-button inactive' }
                >
                    &#62;
                </button>
            </div>
        </div>
    )
}

export default FavoritesList;
