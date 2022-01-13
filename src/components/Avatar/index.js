import React from 'react'
import classes from './_avatar.module.scss'

const Avatar = ({ src }) => {
    return (
        <div className={classes.avatar}>
            <img className={classes.avatar__image} alt="avatar" src={src} />
        </div>
    )
}

export default Avatar
