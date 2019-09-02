import {connect} from 'react-redux';
import ModMap from '../../../../../../../../modules/map';
import BookTicket from './BookTicket';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {setScrollOffset} from '../../../../../../../../modules/scrollOffset';

const tempData = {
    header:
        {
            image : 'https://naxlabel.mobi/products/goexplore/001.jpg',
            title : 'Avengers: Endgame',
            rating : {value:3.5, count:21},
            tags : ['PG 13', 'Action', '3 h 2 m'],
            url : 'https://youtu.be/TcMBFSGVi1c',
        },
    cinemas:[
        {
            name : 'Souq Waqif - Doha',
            dates : [
                {
                    showdate : 'Today',
                    showDay : 'Fri',
                },
                {
                    showdate : '31',
                    showDay : 'Sat',
                },
                {
                    showdate : '01',
                    showDay : 'Sun',
                },
                {
                    showdate : '02',
                    showDay : 'Mon',
                },
                {
                    showdate : '03',
                    showDay : 'Tue',
                },
                {
                    showdate : '04',
                    showDay : 'Wed',
                },
                {
                    showdate : '05',
                    showDay : 'Thu',
                },
            ],
        },
    ],

    // [{"countryId":"2","countryName":"Qatar","countryShortName":"QA","currency":"Qatari riyal","flag":"https://cmsapi-uat.novocinemas.com/Files/Country/636943087968690868b80019e0-591b-444c-a061-031958bb351c.png"},{"countryId":"4","countryName":"Oman","countryShortName":"om","currency":"Omani rial","flag":"https://cmsapi-uat.novocinemas.com/Files/Country/6369430881877589758b23e23b-5cf6-4844-8139-6bf2ecc8fc5d.png"}]
    //
    // [{"cinemasID":"0033","cinemaName":"Souq Waqif - Doha"},{"cinemasID":"023","cinemaName":"Mall of Muscat"},{"cinemasID":"041","cinemaName":"Tawar Mall - Doha"}]
    //
    //     [{"movie_strID":"HO00005012","movie_strName":"How to Train Your Dragon: The Hidden World","movie_strRating":"PG15","movie_strGenre":"Animation","language":"English","imgUrl":"https://cmsapi-uat.novocinemas.com/Files//Movie/600x300/howtotraindragon-1440x720.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/howtotraindragon-250x366.jpg","experienceName":"7 STAR 2D","moviefavflag":0,"movie_Duration":"1 Hrs 45 mins","openingDate":"2019-01-10T00:00:00","expImgUrl":null,"displayOrder":1,"director":"Meenu Gaur ","cast":"Aparna Balamurali ","synopsis":"As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless' discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup's reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.","trailer":""},
    //     {"movie_strID":"HO00005013","movie_strName":"Manikarnika: The Queen of Jhansi","movie_strRating":"PG15","movie_strGenre":"Drama","language":"Hindi","imgUrl":"https://cmsapi-uat.novocinemas.com/Files//Movie/600x300/manikarnika-1440x720.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/manikarnika-250x366.jpg","experienceName":"3D","moviefavflag":0,"movie_Duration":"2 Hrs 55 mins","openingDate":"2019-01-24T00:00:00","expImgUrl":null,"displayOrder":2,"director":"Brian O'Malley ","cast":"Charlotte Vega ","synopsis":"Story of Rani Lakshmibai, one of the leading figures of the Indian Rebellion of 1857 and her resistance to the British Raj.","trailer":"https://www.youtube.com/watch?v=eBw8SPPvGXQ"},
    //     {"movie_strID":"HO00005022","movie_strName":"Cold Pursuit","movie_strRating":"PG","movie_strGenre":"Action","language":"English","imgUrl":"https://cmsapi-uat.novocinemas.com/Files//Movie/600x300/humming_1440x720_1.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/humming_250x366_1.jpg","experienceName":"IMAX 2D","moviefavflag":0,"movie_Duration":"1 Hrs 40 mins","openingDate":"2019-02-07T00:00:00","expImgUrl":null,"displayOrder":3,"director":"Hans Petter Moland","cast":"Laura Dern,Emmy Rossum,Liam Neeson ","synopsis":"A snowplow driver seeks revenge against the drug dealers he thinks killed his son. Based on the 2014 Norwegian film 'In Order of Disappearance'.","trailer":"https://www.youtube.com/watch?v=0phuNQQ_gHI"},
    //     {"movie_strID":"HO00005023","movie_strName":"Alita: Battle Angel","movie_strRating":"PG15","movie_strGenre":"Action","language":"English","imgUrl":"https://cmsapi-uat.novocinemas.com/Files//Movie/600x300/alita-1440x720.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/alita-250x366.jpg","experienceName":"2D","moviefavflag":0,"movie_Duration":"1 Hrs 40 mins","openingDate":"2019-02-14T00:00:00","expImgUrl":null,"displayOrder":4,"director":"Robert Rodriguez","cast":"Rosa Salazar ,Eiza González,Jennifer Connelly","synopsis":"An action-packed story of one young woman's journey to discover the truth of who she is and her fight to change the world.","trailer":"https://www.youtube.com/watch?v=KH-AWvYOE6M"},
    //     {"movie_strID":"HO00005006","movie_strName":"Glass","movie_strRating":"PG15","movie_strGenre":"Drama","language":"English","imgUrl":"https://cmsapi-uat.novocinemas.com/Files//Movie/600x300/glass1440x720.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/glass250x366.jpg","experienceName":"2D","moviefavflag":0,"movie_Duration":"2 Hrs 9 mins","openingDate":"2019-01-17T00:00:00","expImgUrl":null,"displayOrder":5,"director":"M. Night Shyamalan","cast":"Bruce Willis ,Sarah Paulson ,Samuel L Jackson ","synopsis":"Security guard David Dunn uses his supernatural abilities to track Kevin Wendell Crumb, a disturbed man who has twenty-four personalities.","trailer":"https://www.youtube.com/watch?v=95ghQs5AmNk"},
    //     {"movie_strID":"HO00005029","movie_strName":"Spider-Man: Far From Home","movie_strRating":"18TBC","movie_strGenre":"Thriller","language":"English","imgUrl":"https://cmsapi-uat.novocinemas.com/images/NoImage/Movie/600x300/placeholder.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/images/NoImage/Movie/250x366/placeholder.jpg","experienceName":"2D,7 STAR 2D","moviefavflag":0,"movie_Duration":"1 Hrs 39 mins","openingDate":"2019-07-25T00:00:00","expImgUrl":null,"displayOrder":6,"director":"Robert Rodriguez","cast":"Rosa Salazar ,Jennifer Connelly,Eiza González","synopsis":"Peter Parker and his friends go on a European vacation, where Peter finds himself agreeing to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.","trailer":"https://www.youtube.com/watch?v=Bzr-ZTL94T8"},
    //     {"movie_strID":"HO00005028","movie_strName":"The Poison Rose","movie_strRating":"PG15","movie_strGenre":"Thriller","language":"English","imgUrl":"https://cmsapi-uat.novocinemas.com/Files//Movie/600x300/poisonrose1440x720.jpg","movieThumbImg":"https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/poisonrose250x366.jpg","experienceName":"2D","moviefavflag":0,"movie_Duration":"1 Hrs 39 mins","openingDate":"2019-06-13T00:00:00","expImgUrl":null,"displayOrder":7,"director":"Robert Rodriguez","cast":"Rosa Salazar ,Eiza González,Jennifer Connelly","synopsis":"Inspired by classic film noir, Carson Phillips, an ex-football star turned PI, has a soft spot for a lady in distress.","trailer":"https://www.youtube.com/watch?v=Bzr-ZTL94T8"}]
};

BookTicket.propTypes = {
    data : PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        data: tempData,//state[ ModMap.Categories ].data,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setScrollOffset: (iValue) => dispatch(setScrollOffset(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(BookTicket);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
