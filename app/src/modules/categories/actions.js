import t from './types';
import api, {screens, CATEGORY_API} from '../../constants';
import {isLoading} from '../loading';
import ModMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';

const tempDataCinama = {header:[
        {
            id : 'HO00005013',
            image : 'https://naxlabel.mobi/products/goexplore/001.jpg',
            title : 'Avengers: Endgame',
            subTitle : 'Action, PG 13, English | 3h 2m',
            rating : 3.5,
            tags : ['PG 13', 'Action', '3 h 2 m'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '0002',
            image : 'https://naxlabel.mobi/products/goexplore/002.jpg',
            title : 'CHI,  The SPA',
            subTitle : 'CHI, The SPA, the only luxury',
            rating : 5.0,
            tags : ['SPA', 'Health', 'Luxury'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'health',
        },
        {
            id : 'HO00005029',
            image : 'https://naxlabel.mobi/products/goexplore/003.jpg',
            title : 'The Lalit Golf & Spa Resort',
            subTitle : '1.1 km from Fatread Beach',
            rating : 1.25,
            tags : ['Resort', 'SPA', 'City Center'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
    ],
    data:[
        {
            type : 'big',
            title : 'Trending Now',
            data : [
                {
                    id: 'HO00005022',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/howtotraindragon-250x366.jpg',
                    title: 'How to Train\nYour Dragon:\nThe Hidden World',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 3.5,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: 'HO00005006',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/manikarnika-250x366.jpg',
                    title: 'Manikarnika:\nThe Queen of Jhansi',
                    subTitle: 'CHI, The SPA, the only luxury',
                    rating: 5.0,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: 'HO00005023',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/humming_250x366_1.jpg',
                    title: 'Cold Pursuit',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 1.25,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Things To Do',
            data : [
                {
                    id: 'HO00005006',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/alita-250x366.jpg',
                    title: 'Alita:\nBattle Angel',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: 'HO00005022',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/glass250x366.jpg',
                    title: 'Glass',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: 'HO00005023',
                    image: 'https://cmsapi-uat.novocinemas.com/images/NoImage/Movie/250x366/placeholder.jpg',
                    title: 'Spider-Man:\nFar From Home',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Newly Added',
            data : [
                {
                    id: 'HO00005029',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/poisonrose250x366.jpg',
                    title: 'The Poison Rose',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://naxlabel.mobi/img/portfolio/cake.png',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'health',
                },
                {
                    id: '00003',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'dining',
                },
            ],
        },
        {
            type : 'small',
            title : 'We Explored',
            data : [
                {
                    id: 'HO00005012',
                    image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: 'HO00005013',
                    image: 'https://naxlabel.mobi/img/portfolio/cake.png',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: 'HO00005029',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
    ],
};

const tempDataTravel = {header:[
        {
            id : '1001',
            image : 'https://naxlabel.mobi/products/goexplore/trav/001.jpg',
            title : 'Sharq Village & Spa',
            subTitle : 'Ras Abu Abboud St, Doha',
            rating : 4.5,
            tags : ['Resort', 'SPA', 'City Center'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '1002',
            image : 'https://naxlabel.mobi/products/goexplore/trav/002.jpg',
            title : 'Marsa Malaz Kempinski,\nThe Pearl',
            subTitle : 'The Pearl - Doha, Costa Malaz Bay',
            rating : 4.7,
            tags : ['SPA', 'Health', 'Luxury'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '1003',
            image : 'https://naxlabel.mobi/products/goexplore/trav/003.jpg',
            title : 'Sheraton Grand\nDoha Resort',
            subTitle : 'Al Corniche St, Doha',
            rating : 4.7,
            tags : ['Resort', 'SPA', 'City Center'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
    ],
    data:[
        {
            type : 'big',
            title : 'Trending Now',
            data : [
                {
                    id: '10004',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/016.jpg',
                    title: 'How to Train\nYour Dragon:\nThe Hidden World',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 3.5,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '10005',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/005.jpg',
                    title: 'Manikarnika:\nThe Queen of Jhansi',
                    subTitle: 'CHI, The SPA, the only luxury',
                    rating: 5.0,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '10006',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/006.jpg',
                    title: 'Cold Pursuit',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 1.25,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Things To Do',
            data : [
                {
                    id: '10007',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/007.jpg',
                    title: 'Alita:\nBattle Angel',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10008',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/008.jpg',
                    title: 'Glass',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10009',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/009.jpg',
                    title: 'Spider-Man:\nFar From Home',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Newly Added',
            data : [
                {
                    id: '10010',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/010.jpg',
                    title: 'The Poison Rose',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10011',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/011.jpg',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10012',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/012.jpg',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'We Explored',
            data : [
                {
                    id: '10013',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/013.jpg',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10014',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/014.jpg',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10015',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/015.jpg',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
    ],
};

const newTempData = {"banners":{"title":"Banners","data":[{"id":"81447035-ad39-48ad-89dd-a3a3787a5d0b","title":"Summer in Qatar 2019","description":"Qatar National Tourism Council (QNTC) announced a season of summer \nexperiences, retail offers and entertainment, to run from June 4 to \nAugust 16. This year&rsquo;s &lsquo;Summer in Qatar&rsquo; introduces a wide range of \nexciting indoor and outdoor experiences, along with entertainment \nprogrammes featuring local, regional and international artists, \nedutainment, summer and sports camps as well as special promotions on \ninbound travel, hospitality and shopping.\n- For more information, please visit: http://summerinqatar.qa/\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8919_04a220904d1e540c1bef443b2c38696ee.png?sfvrsn=7f728f92_3","location":"","showInHotPickBanner":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-07-25T11:32:56Z"},{"id":"e021dd89-a44d-448d-b611-d47cc1f3723c","movie_ID":"HO00005023","title":"Alita: Battle Angel","movieSynopsis":"An action-packed story of one young woman's journey to discover the truth of who she is and her fight to change the world.","duration":"1 Hrs 40 mins","trailer":"https://www.youtube.com/watch?v=KH-AWvYOE6M","rating":"PG15","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/cinema/maxresdefault3fe1c543c98f4fa384b9cdbf8748f7b4.jpg?sfvrsn=8b6c1844_3","showInHotPickBanner":true,"trendingNow":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-09-09T09:09:33Z"},{"id":"a8b447f2-bc71-4b9a-b125-a15edd47d234","movie_ID":"HO00005029","title":"Spider-Man: Far From Home","movieSynopsis":"Peter Parker and his friends go on a European vacation, where Peter finds himself agreeing to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.","duration":"1 Hrs 39 mins","trailer":"https://www.youtube.com/watch?v=Bzr-ZTL94T8","rating":"18TBC","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/cinema/spider-man-far-from-home-posters-side-by-side.jpg?sfvrsn=f35d3bbb_3","showInHotPickBanner":true,"trendingNow":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-09-09T09:02:32Z"},{"id":"7280ff80-fc27-498f-a8d9-c9677bb4a43c","movie_ID":"HO00005006","title":"Glass","movieSynopsis":"Security guard David Dunn uses his supernatural abilities to track Kevin Wendell Crumb, a disturbed man who has twenty-four personalities.","duration":"2 Hrs 9 mins","trailer":"https://www.youtube.com/watch?v=95ghQs5AmNk","rating":"PG15","showInHotPickBanner":true,"trendingNow":true,"showInBanner":true,"hotPickBannerDisplayOrder":"2","dateCreated":"2019-09-09T09:05:17Z"}]},"newlyAdded":{"title":"Newly Added","data":[{"id":"943346a9-289e-4f83-9cb1-e716f1766e42","title":"SUMMER CAMP FOR KIDS 2019","description":"Aspire Zone Foundation is organizing the second edition of the Summer \nCamp for Kids 2019 aiming to present a range of interesting and useful \nactivities for children who are in Qatar during the summer holidays. The\n participating children will practice various activities such as \nfootball, volleyball, athletics, taekwondo, gymnastics, aerobics and \nrecreational games, in addition to field visits, courses, art and craft.\n\nSessions will be held 4 days per week, from Sunday to Wednesday, for \nboth girls and boys.\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/sc.jpg?sfvrsn=5be55a6f_3","location":"","dateCreated":"2019-07-25T11:38:09Z"},{"id":"81447035-ad39-48ad-89dd-a3a3787a5d0b","title":"Summer in Qatar 2019","description":"Qatar National Tourism Council (QNTC) announced a season of summer \nexperiences, retail offers and entertainment, to run from June 4 to \nAugust 16. This year&rsquo;s &lsquo;Summer in Qatar&rsquo; introduces a wide range of \nexciting indoor and outdoor experiences, along with entertainment \nprogrammes featuring local, regional and international artists, \nedutainment, summer and sports camps as well as special promotions on \ninbound travel, hospitality and shopping.\n- For more information, please visit: http://summerinqatar.qa/\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8919_04a220904d1e540c1bef443b2c38696ee.png?sfvrsn=7f728f92_3","location":"","showInHotPickBanner":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-07-25T11:32:56Z"},{"id":"f4ff7bc0-b9e2-4bab-83ac-a3441e1aa870","movie_ID":"HO00005012","title":"How to Train Your Dragon: The Hidden World","movieSynopsis":"As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless' discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup's reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.","duration":"1 Hrs 45 mins","trailer":"","rating":"PG15","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/cinema/how-to-train-your-dragon-hidden-world-1024x600.jpg?sfvrsn=d35b9f46_3","dateCreated":"2019-09-09T09:37:00Z"},{"id":"7d9a59f2-5e5d-413e-be83-e71ed0b7c819","movie_ID":"HO00005013","title":"Manikarnika: The Queen of Jhansi","movieSynopsis":"Story of Rani Lakshmibai, one of the leading figures of the Indian Rebellion of 1857 and her resistance to the British Raj.","duration":"2 Hrs 55 mins","trailer":"https://www.youtube.com/watch?v=eBw8SPPvGXQ","rating":"PG15","dateCreated":"2019-09-09T09:18:49Z"},{"id":"f916a89f-ffbf-4357-9ae1-91101efbe2bc","title":"Eatopia","description":"Casual dining and bakery, known for live cooking stations and smart card payment system. Located in Dafna.","location":"2nd Floor The Gate Mall, Omar Al Mukhtar Street, West Bay, Al Dafna, Doha","phoneNo":"(+974) 4020 6400","dateCreated":"2019-06-09T12:21:03Z"},{"id":"4486b9da-8740-4669-948f-9a15a0d93f0e","title":"Pizza Hut","description":"Casual dining pizza franchise offering a variety of crusts and flatbread pizzas. With multiple locations across Doha.","location":"1st Floor, near Carrefour, City Center Mall, West Bay, Doha","phoneNo":"(+974) 4432 0320","dateCreated":"2019-06-09T12:21:03Z"},{"id":"ae98ea29-b54b-4973-b162-b5bf65ad0519","title":"Pets Care Clinic","description":"Pets Care Services is a locally owned and operated company in Qatar which wants to help people with their pets the standard of care that themselves expect and would give their pet themselves. We love pets! And very quickly your pet becomes a part of our family too. Our aim is for your pet to want to spend time with.","location":"Al Meshal Street, Al Hilal, Doha","phoneNo":"(+974) 4488 1036","dateCreated":"2019-09-15T08:26:37Z","type":"6"},{"id":"381cdd2c-456d-4ac0-a42c-31a34071a951","title":"Vets 4 Pets Veterinary Clinic","description":"Vets 4 Pets Qatar is a relatively new veterinary clinic in Doha, however, for many years the owner and managers have run a very successful business providing human medical and pharmaceutical care within Qatar. With this vast experience, knowledge and access to crucial resources, Vets 4 Pets can continuously provide a high level of veterinary care to the residents of Doha.","location":"Villa 74, Umm Al Kharg St,  Al-Azizia, Al Rayyan","phoneNo":"(+974) 4487 1642","dateCreated":"2019-09-15T07:05:08Z","type":"6"},{"id":"99d8cf7a-dd8a-4fcc-8fd5-e4cc28dae480","title":"Mac Cosmetics","description":"A world-famous cosmetics brand, specialising in a wide range of professional makeup, with multiple locations throughout Doha.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/shoppings/17158973_1669771396659261_8420360946334689541_o.jpg?sfvrsn=9f9bae2c_1","location":"Second Floor, City Centre Mall, West Bay, Doha","phoneNo":"(+974) 44839250","dateCreated":"2019-06-09T12:09:29Z"},{"id":"4c9d6270-a732-4490-9740-68ca38724966","title":"Wojooh","description":"Wojooh is the leading beauty retailer in the region with 20 years of presence and expertise in the market. With 85 stores across 9 countries and an online presence, we are still growing with an international expansion in the near future. Being pioneers in beauty retail in the region has allowed us to become undeniable fragrance, makeup and skincare experts.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/shoppings/26733856_1652555564766875_834143912888660876_n.jpg?sfvrsn=f273e463_1","location":"Ground Floor, Landmark Mall, Al Gharrafa","phoneNo":"(+974) 4487 9519","dateCreated":"2019-06-09T12:09:26Z"},{"id":"26140cf6-6ff3-4fd6-abff-af50764ee95b","title":"Grand Qatar Palace Hotel","description":"A three-star hotel located in Mushaireb, walking distance from Souq Waqif.","location":"Ahmed Bin Mohammed Bin Thani Street, Musheireb, Doha","phoneNo":"(+974) 44414140","dateCreated":"2019-08-25T11:25:51Z"},{"id":"a711d0be-3ba2-434f-a133-b072102f9727","title":"Oryx Rotana Doha","description":"A 5-star luxury hotel in Doha, offering a wide variety of room options, award-winning international cuisine, and first-class amenities to all visitors.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/hotel/1576_0.jpg?sfvrsn=ca512da9_2","location":"Al Matar Street, Doha, Qatar","phoneNo":"+974 4402 3333","showInBanner":true,"dateCreated":"2019-08-25T11:25:51Z"}]},"trendingNow":{"title":"Trending Now","data":[{"id":"541b967a-5859-4c7d-9df2-f256082026dc","title":"Tom Claassen","description":"Born in 1964, Dutch artist Tom Claassen is known all over the world for his abstract animal sculptures. Although most of his work is exhibited in the Netherlands, some have made it to Qatar, now calling Hamad International Airport home. \r\nKeen-eyed travelers will have spotted a herd of Oryx sculptures traversing the airport’s arrivals hall. The bronze statues of Qatar’s national animal are scattered throughout the indoor landscape and are often seen carrying small children for a perfect photo opportunity.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/attractions/37.jpg?sfvrsn=fb57f101_2","location":"Arrivals Hall, Hamad International Airport, Doha","phoneNo":"4452 5555","trendingNow":true,"dateCreated":"2019-07-22T11:02:11Z","type":"3"},{"id":"7280ff80-fc27-498f-a8d9-c9677bb4a43c","movie_ID":"HO00005006","title":"Glass","movieSynopsis":"Security guard David Dunn uses his supernatural abilities to track Kevin Wendell Crumb, a disturbed man who has twenty-four personalities.","duration":"2 Hrs 9 mins","trailer":"https://www.youtube.com/watch?v=95ghQs5AmNk","rating":"PG15","showInHotPickBanner":true,"trendingNow":true,"showInBanner":true,"hotPickBannerDisplayOrder":"2","dateCreated":"2019-09-09T09:05:17Z"},{"id":"e021dd89-a44d-448d-b611-d47cc1f3723c","movie_ID":"HO00005023","title":"Alita: Battle Angel","movieSynopsis":"An action-packed story of one young woman's journey to discover the truth of who she is and her fight to change the world.","duration":"1 Hrs 40 mins","trailer":"https://www.youtube.com/watch?v=KH-AWvYOE6M","rating":"PG15","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/cinema/maxresdefault3fe1c543c98f4fa384b9cdbf8748f7b4.jpg?sfvrsn=8b6c1844_3","showInHotPickBanner":true,"trendingNow":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-09-09T09:09:33Z"},{"id":"a8b447f2-bc71-4b9a-b125-a15edd47d234","movie_ID":"HO00005029","title":"Spider-Man: Far From Home","movieSynopsis":"Peter Parker and his friends go on a European vacation, where Peter finds himself agreeing to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.","duration":"1 Hrs 39 mins","trailer":"https://www.youtube.com/watch?v=Bzr-ZTL94T8","rating":"18TBC","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/cinema/spider-man-far-from-home-posters-side-by-side.jpg?sfvrsn=f35d3bbb_3","showInHotPickBanner":true,"trendingNow":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-09-09T09:02:32Z"},{"id":"5432e9dd-5fd0-4569-acac-519d5a70468d","movie_ID":"HO00005022","title":"Cold Pursuit","movieSynopsis":"A snowplow driver seeks revenge against the drug dealers he thinks killed his son. Based on the 2014 Norwegian film 'In Order of Disappearance'.","duration":"1 Hrs 40 mins","trailer":"https://www.youtube.com/watch?v=0phuNQQ_gHI","rating":"PG","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/cinema/p14793243_v_h8_ab.jpg?sfvrsn=dabf8322_3","trendingNow":true,"showInBanner":true,"dateCreated":"2019-09-09T09:13:28Z"},{"id":"56201e43-856a-4479-b968-aa6a82105c86","title":"Grand Hyatt Doha","description":"Grand Hyatt is a 5-Star hotel located in West Bay, just north of central Doha. One of the most popular in town, the hotel lies on the stunning shoreline of West Bay Lagoon, allowing for all rooms to come with their very own stunning seaside view. \r\n\r\nWith extensive meeting and banquet facilities, a full-service business centre, the renowned Jaula Spa, and a 400-metre private beach, the range of top-quality amenities seems almost endless. \r\n\r\nThe hotel is also home to a range of award-winning restaurants, catering to all local and international tastes.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/hotel/341_0.jpg?sfvrsn=e58fd944_2","location":"West Bay Lagoon, Doha","phoneNo":"(+974) 4448 1234","trendingNow":true,"dateCreated":"2019-08-25T11:25:50Z"}]},"thingsToDo":{"title":"Things To Do","data":[{"id":"943346a9-289e-4f83-9cb1-e716f1766e42","title":"SUMMER CAMP FOR KIDS 2019","description":"Aspire Zone Foundation is organizing the second edition of the Summer \nCamp for Kids 2019 aiming to present a range of interesting and useful \nactivities for children who are in Qatar during the summer holidays. The\n participating children will practice various activities such as \nfootball, volleyball, athletics, taekwondo, gymnastics, aerobics and \nrecreational games, in addition to field visits, courses, art and craft.\n\nSessions will be held 4 days per week, from Sunday to Wednesday, for \nboth girls and boys.\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/sc.jpg?sfvrsn=5be55a6f_3","location":"","dateCreated":"2019-07-25T11:38:09Z"},{"id":"81447035-ad39-48ad-89dd-a3a3787a5d0b","title":"Summer in Qatar 2019","description":"Qatar National Tourism Council (QNTC) announced a season of summer \nexperiences, retail offers and entertainment, to run from June 4 to \nAugust 16. This year&rsquo;s &lsquo;Summer in Qatar&rsquo; introduces a wide range of \nexciting indoor and outdoor experiences, along with entertainment \nprogrammes featuring local, regional and international artists, \nedutainment, summer and sports camps as well as special promotions on \ninbound travel, hospitality and shopping.\n- For more information, please visit: http://summerinqatar.qa/\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8919_04a220904d1e540c1bef443b2c38696ee.png?sfvrsn=7f728f92_3","location":"","showInHotPickBanner":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-07-25T11:32:56Z"},{"id":"497f427b-1810-42c1-ba94-7b54d6a2ad0f","title":"Trevor Noah back in Qatar for Doha Comedy Festival","description":"Doha: As part of Summer in Qatar, Doha Comedy Festival in their newest \nedition, is bringing back &lsquo;The Daily Show&rsquo; host and renowned comedian \nTrevor Noah to perform live in Qatar.\n\nTrevor Noah is known for hosting &lsquo;The Daily Show&rsquo;, an American satirical\n news program on Comedy Central. Apart from being a comedian, he is also\n a writer, producer, political commentator, actor and television host.\n\nThe show will take place on July 12 at Qatar National Convention Centre \nfrom 7:30pm to 11pm.\n\nThe tickets, ranging from QR 175 to QR675, are available for sale online\n on the Virgin Megastore website and offline in all its branches.\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8938_0.jpg?sfvrsn=1622b65c_3","location":"","dateCreated":"2019-07-25T11:26:59Z"},{"id":"89a6597c-03d5-4ce5-ace6-25c7b242dd29","title":"Snooker and Darts Competition","description":"This event is for snooker and darts enthusiasts who want to engage with \nthe community through a friendly competition. It is open even to all QF \nstaff and their respective families.\n\nFor registration and more information, please contact: \ncommunityservices@qf.org.qa\n","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8937_0.jpg?sfvrsn=9b8a720_3","location":"","dateCreated":"2019-07-25T11:20:22Z"},{"id":"5e610cc8-17bb-4a08-a3ca-eb774c58af14","title":"Summer Camp 2019 at Mamangam Performing Art Centre","description":"Get your lil champs for the Best Summer camp thats happening in Doha \nMamangam Performing Art Centre for lots of Indoor Activities that your \nchamp will love !!\n\n*Age criteria : * 5 yrs - 15 yrs\n\n- Schedule:\n- Batch 1 : 26th June - 24th July\n- Batch 2 : 25th July - 24th August\n\n- Enroll Now !! Seats are limited !!\nPrice: - 600 per batch with Transportation 180 within Doha, 200 for \nWakraQR\n\n- Get all the info @ (+974) 33897609\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8918_0.jpg?sfvrsn=78241011_3","location":"","dateCreated":"2019-07-25T11:14:58Z"},{"id":"bdd9fe72-ac43-4994-8eca-2b46d90cc987","title":"Heritage Library’s Permanent Exhibition","description":"The Exhibition displays around 400 items from our Heritage Library \ncollection that illustrate the spread and evolution of ideas throughout \nthe Arab and Islamic world, as well as document interactions between \nArabs and the West over the past several centuries. The exhibition \nfeatures books, manuscripts, historical photographs maps, globes and \ntravelers' instruments that tell the story of Qatar, along with the \nhistory of science, literature, writing, travel in the region, and much \nmore.\n\nThe Exhibition will be open during the library&rsquo;s working hours, at the \nheritage library exhibition area\n\nFor more information about the event, please visit QNL website: \nhttps://events.qnl.qa/event/ng2YV/EN\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8842_0.jpg?sfvrsn=a027dcdf_3","location":"","dateCreated":"2019-07-25T10:56:24Z"},{"id":"8053edb2-1a3d-404e-8ac5-4c3900f76bd5","title":"The Golden Masjid","description":"The Golden Masjid was garnished with extremely small golden chips, and it represents Ottoman style. Katara offers, in masjids, several religious programs and a series of religious lectures delivered by a group of prominent and esteemed religious scholars. Katara also organizes advanced courses in Quran memorization that are widely attended by a considerable number of children from different age groups. Such courses bear significance because they instill the virtuous values and the good manners of the Holy Quran.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/attractions/tgm1.jpg?sfvrsn=53227e15_3","location":"Katara Cultural Village, West Bay, Al Dafna, Doha","phoneNo":"4408 0000","showInBanner":true,"dateCreated":"2019-07-22T11:02:28Z","type":"3"},{"id":"4f0de050-8650-4ffd-82fb-4a6d8d852057","title":"Al Hazm","description":"One of Doha’s most luxurious shopping destinations, housing many high-end outlets and dining experiences. Based on Milan’s iconic Galleria Vitorio Emanuele II, the mall perfectly blends classical European architecture with a touch of Arab flair, creating a truly unique space.\r\n\r\nA glass pyramid marks the mall’s VIP entrance, where you’d be forgiven for thinking you’d mistakenly made your way to Paris’s iconic Louvre museum. Personal shoppers are there to cater for your retail needs, assisting to ensure you find exactly what you’re looking for. \r\n\r\nThe theme of luxury extends over every inch of Al Hazm, even down to the specially imported 200-year-old olive trees from the island of Sicily. Similar to the ones found in Mecca, the trees further symbolise the fusion of European design and Arab tradition. \r\n\r\nNeedless to say, a remarkably stunning shopping experience awaits you.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/attractions/7626_0.jpg?sfvrsn=bab88224_2","location":"Al Markhiya, Doha","phoneNo":"4466 6625","dateCreated":"2019-07-22T11:02:28Z","type":"6"},{"id":"5ab21483-da3e-45cb-8572-3ea88c7b0327","title":"Subodh Gupta","description":"Inspired by Gandhi’s infamous proverb ‘see no evil, hear no evil, speak no evil’, Subodh Gupta’s trio of sculptures look to tackle the issue of conflict in the modern world. \r\n\r\nInstalled in Katara Cultural Village, the busts each wear a different piece of military headgear that covers either the eyes, ears, or mouth, depicting one of the Three Wise Monkeys. Designed from bronze as well as items such as kitchenware and cutlery, they give a strong a sense of familiarity that contrasts with the harsh image that they convey. \r\nGupta’s goal was to highlight the differences between war and peace, outlining how these ideas are now part of our everyday lives. \r\nThe striking pieces are amongst a vast array of art that Katara offers, all of which look to express different real-world issues in a variety of ways. \r\nLocated by the Cultural Village’s Amphitheatre, Gandhi’s Three Monkeys are worth a look as you enjoy a walk along Doha’s coast.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/attractions/34.jpg?sfvrsn=463b865_2","location":"Katara Cultural Village, West Bay, Al Dafna, Doha","phoneNo":"4452 5555","dateCreated":"2019-07-22T11:02:26Z","type":"3"},{"id":"1d5dc7ac-c022-430b-9e55-38744fbb436b","title":"Dar Al Salam","description":"Dar Al Salam mall is in the Abu Hamour district of Doha. This mall gives you the chance to escape life’s daily routines and relax in a safe and shopping space. \r\nThe mall contains 105 stores, providing the ultimate shopping experience, housing 50 global brand outlets offering high-quality products and services. \r\nFor those who need constant internet connectivity, there are plenty of hotspots available, and with free parking, plenty of ATMs, and an extensive food court, almost every need is catered for. \r\nVisit their website for more information, daralsalam-mall.com.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/attractions/7635_0.jpg?sfvrsn=104241a1_2","location":"Bu Hamour, Al Rayyan","phoneNo":"4016 3573","dateCreated":"2019-07-22T11:02:25Z","type":"6"},{"id":"dc07a4bb-e57f-4dd2-bb54-35c5061f3e03","title":"Emiri Diwan Palace","description":"Located alongside Doha’s Corniche, the Emiri Diwan Palace is the administrative, ceremonial, and symbolic centre of Qatar. The palace stands amongst pristine gardens, waterfall fountains and towering palm trees, and houses the offices of His Highness the Emir, the Crowne Prince, and Prime Minister.\r\nIf you are stuck in traffic along the Cornice, eventually, you will probably end up marvelling at the powerful Arab architecture and immaculately kept grounds.\r\nIf you thought it was impressive during the day, make sure to visit after dark. Lit from the ground up, the palace looks over Doha bay in a truly imposing and majestic fashion.\r\nWhy not visit after spending an evening at Souq Waqif? A five-minute stroll along the waterfront allows you to see the palace from all angles before hailing a cab and heading elsewhere.","location":"Doha Corniche, Doha","phoneNo":"4438 8888","dateCreated":"2019-07-22T11:02:25Z","type":"3"},{"id":"433058c5-2b8f-44de-a87a-2a0c9d4b9285","title":"Katara Opera House","description":"Home to the Qatar Philharmonic Orchestra, Katara Opera house is one of Doha’s premier venues for hosting musical art. Located within Katara Cultural Village the 550-seat ornate theatre has hosted some of the World’s leading classical artists. \r\nMuch like Katara’s Amphitheatre, The Opera House’s design drew inspiration from classic European architecture, blended with traditional Arab style to create one of the most sophisticated indoor spaces in the city.\r\nMade up of a concert hall, large auditorium and royal viewing terrace, the venue is set to present even more world-famous symphonies including that of Beethoven and Prokofiev. Check our events tab for more details.","location":"Katara Cultural Village, West Bay, Al Dafna, Doha","phoneNo":"4408 0000","dateCreated":"2019-07-22T11:02:24Z","type":"3"}]},"weExplored":{"title":"We Explored","data":[{"id":"943346a9-289e-4f83-9cb1-e716f1766e42","title":"SUMMER CAMP FOR KIDS 2019","description":"Aspire Zone Foundation is organizing the second edition of the Summer \nCamp for Kids 2019 aiming to present a range of interesting and useful \nactivities for children who are in Qatar during the summer holidays. The\n participating children will practice various activities such as \nfootball, volleyball, athletics, taekwondo, gymnastics, aerobics and \nrecreational games, in addition to field visits, courses, art and craft.\n\nSessions will be held 4 days per week, from Sunday to Wednesday, for \nboth girls and boys.\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/sc.jpg?sfvrsn=5be55a6f_3","location":"","dateCreated":"2019-07-25T11:38:09Z"},{"id":"81447035-ad39-48ad-89dd-a3a3787a5d0b","title":"Summer in Qatar 2019","description":"Qatar National Tourism Council (QNTC) announced a season of summer \nexperiences, retail offers and entertainment, to run from June 4 to \nAugust 16. This year&rsquo;s &lsquo;Summer in Qatar&rsquo; introduces a wide range of \nexciting indoor and outdoor experiences, along with entertainment \nprogrammes featuring local, regional and international artists, \nedutainment, summer and sports camps as well as special promotions on \ninbound travel, hospitality and shopping.\n- For more information, please visit: http://summerinqatar.qa/\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8919_04a220904d1e540c1bef443b2c38696ee.png?sfvrsn=7f728f92_3","location":"","showInHotPickBanner":true,"showInBanner":true,"hotPickBannerDisplayOrder":"1","dateCreated":"2019-07-25T11:32:56Z"},{"id":"497f427b-1810-42c1-ba94-7b54d6a2ad0f","title":"Trevor Noah back in Qatar for Doha Comedy Festival","description":"Doha: As part of Summer in Qatar, Doha Comedy Festival in their newest \nedition, is bringing back &lsquo;The Daily Show&rsquo; host and renowned comedian \nTrevor Noah to perform live in Qatar.\n\nTrevor Noah is known for hosting &lsquo;The Daily Show&rsquo;, an American satirical\n news program on Comedy Central. Apart from being a comedian, he is also\n a writer, producer, political commentator, actor and television host.\n\nThe show will take place on July 12 at Qatar National Convention Centre \nfrom 7:30pm to 11pm.\n\nThe tickets, ranging from QR 175 to QR675, are available for sale online\n on the Virgin Megastore website and offline in all its branches.\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8938_0.jpg?sfvrsn=1622b65c_3","location":"","dateCreated":"2019-07-25T11:26:59Z"},{"id":"89a6597c-03d5-4ce5-ace6-25c7b242dd29","title":"Snooker and Darts Competition","description":"This event is for snooker and darts enthusiasts who want to engage with \nthe community through a friendly competition. It is open even to all QF \nstaff and their respective families.\n\nFor registration and more information, please contact: \ncommunityservices@qf.org.qa\n","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8937_0.jpg?sfvrsn=9b8a720_3","location":"","dateCreated":"2019-07-25T11:20:22Z"},{"id":"5e610cc8-17bb-4a08-a3ca-eb774c58af14","title":"Summer Camp 2019 at Mamangam Performing Art Centre","description":"Get your lil champs for the Best Summer camp thats happening in Doha \nMamangam Performing Art Centre for lots of Indoor Activities that your \nchamp will love !!\n\n*Age criteria : * 5 yrs - 15 yrs\n\n- Schedule:\n- Batch 1 : 26th June - 24th July\n- Batch 2 : 25th July - 24th August\n\n- Enroll Now !! Seats are limited !!\nPrice: - 600 per batch with Transportation 180 within Doha, 200 for \nWakraQR\n\n- Get all the info @ (+974) 33897609\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8918_0.jpg?sfvrsn=78241011_3","location":"","dateCreated":"2019-07-25T11:14:58Z"},{"id":"bdd9fe72-ac43-4994-8eca-2b46d90cc987","title":"Heritage Library’s Permanent Exhibition","description":"The Exhibition displays around 400 items from our Heritage Library \ncollection that illustrate the spread and evolution of ideas throughout \nthe Arab and Islamic world, as well as document interactions between \nArabs and the West over the past several centuries. The exhibition \nfeatures books, manuscripts, historical photographs maps, globes and \ntravelers' instruments that tell the story of Qatar, along with the \nhistory of science, literature, writing, travel in the region, and much \nmore.\n\nThe Exhibition will be open during the library&rsquo;s working hours, at the \nheritage library exhibition area\n\nFor more information about the event, please visit QNL website: \nhttps://events.qnl.qa/event/ng2YV/EN\n                                ","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/events/8842_0.jpg?sfvrsn=a027dcdf_3","location":"","dateCreated":"2019-07-25T10:56:24Z"},{"id":"26140cf6-6ff3-4fd6-abff-af50764ee95b","title":"Grand Qatar Palace Hotel","description":"A three-star hotel located in Mushaireb, walking distance from Souq Waqif.","location":"Ahmed Bin Mohammed Bin Thani Street, Musheireb, Doha","phoneNo":"(+974) 44414140","dateCreated":"2019-08-25T11:25:51Z"},{"id":"a711d0be-3ba2-434f-a133-b072102f9727","title":"Oryx Rotana Doha","description":"A 5-star luxury hotel in Doha, offering a wide variety of room options, award-winning international cuisine, and first-class amenities to all visitors.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/hotel/1576_0.jpg?sfvrsn=ca512da9_2","location":"Al Matar Street, Doha, Qatar","phoneNo":"+974 4402 3333","showInBanner":true,"dateCreated":"2019-08-25T11:25:51Z"},{"id":"56201e43-856a-4479-b968-aa6a82105c86","title":"Grand Hyatt Doha","description":"Grand Hyatt is a 5-Star hotel located in West Bay, just north of central Doha. One of the most popular in town, the hotel lies on the stunning shoreline of West Bay Lagoon, allowing for all rooms to come with their very own stunning seaside view. \r\n\r\nWith extensive meeting and banquet facilities, a full-service business centre, the renowned Jaula Spa, and a 400-metre private beach, the range of top-quality amenities seems almost endless. \r\n\r\nThe hotel is also home to a range of award-winning restaurants, catering to all local and international tastes.","url":"https://testgoexplorecity.azurewebsites.net/images/default-source/hotel/341_0.jpg?sfvrsn=e58fd944_2","location":"West Bay Lagoon, Doha","phoneNo":"(+974) 4448 1234","trendingNow":true,"dateCreated":"2019-08-25T11:25:50Z"},{"id":"ee6b6038-04cf-4c52-9d00-a0ce71cf614c","title":"Al Baset Trading & Transportation","description":"Al Baset provides large scale trading and transportation solutions for Qatar and the surrounding GCC countries.","location":"Office No. 107, 1st floor, Al-Rawdat Complex, Salwa Road, Doha","phoneNo":"(+974) 4458 2201","dateCreated":"2019-08-25T11:25:48Z"},{"id":"66dc6e52-9aaa-4c9b-806d-a12ffbf51801","title":"Al Buraq Transport","description":"","location":"Najma, Doha","phoneNo":"(+974) 4442 2213#(+974) 4432 4871","dateCreated":"2019-08-25T11:25:48Z"},{"id":"26a8ef3d-1a3f-4208-8163-983edb5eb6e2","title":"Golden Star Rent A Car","description":"A car rental company located on Doha's busy Al Mirqab Street.","location":"New Al Marqab Street, Al Nasr, Doha","phoneNo":"(+974) 4435 6224#(+974) 5556 1315","dateCreated":"2019-08-25T11:25:47Z"}]}};

const tempFilter = {
    'Location':[{label:'Mall of Qatar - Doha', value:'place0'}, {label:'Another Place 1', value:'place1'}, {label:'Another Place 2', value:'place2'}, {label:'Another Place 3', value:'place3'}],
    'Genre':['Action', 'Adult', 'Adventure', 'Avant-garde/Experimental', 'Comedy', 'Children\'s/Family', 'Comedy Drama', 'Crime', 'Drama', 'Epic', 'Fantasy', 'Historical Film', 'Horror', 'Musical', 'Mystery', 'Romance', 'Science Fiction', 'Spy Film', 'War', 'Western'],
    'Experience':['2D', '2D IMAX', '3D', '3D IMAX'],
    'Languages':['English', 'Arabian', 'French', 'Italian'],
    'Price':[40, 200],
};


function hasErrored(iBool) {
    return {
        type: t.HAS_ERRORED,
        hasErrored: iBool,
    };
}

function curCategory(iValue) {
    return {
        type: t.SET_CUR_CATEGORY,
        curCategory: iValue,
    };
}

function updateCategoryData(iData) {
    return {
        type: t.UPDATE_DATA,
        data: iData,
    };
}

function updateFilter(iData) {
    return {
        type: t.UPDATE_FILTER,
        data: iData,
    };
}

function updateFilterSettings(iData) {
    return {
        type: t.UPDATE_FILTERS_SETTINGS,
        data: iData,
    };
}


function loadCategoryData(iCategory, iFilter, iDispatch) {
    // fetch(api + '?' + (iFilter ? iFilter : 'user'))//'?user='+iUser.email+'&pass='+md5(iUser.pass)
    fetch(CATEGORY_API[iCategory])
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            // data = newTempData;//iCategory === screens.Travel ? tempDataTravel : tempDataCinama;
            iDispatch(updateCategoryData({[iCategory]: data}));
            iDispatch(isLoading(false));
        })
        .catch(() => iDispatch(hasErrored(true)));
}


function loadFilterData(iCategory, iDispatch) {
    fetch(api + '?filter=' + iCategory)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            data = tempFilter;
            iDispatch(updateFilter({[iCategory]: data}));
        })
        .catch(() => iDispatch(hasErrored(true)));
}


export function setCurCategory(iValue) {
    return (dispatch, getState) => {
        dispatch(curCategory(iValue));

        if (getState()[ModMap.Categories].categories[iValue]){
            return Promise.resolve();
        } else {
            dispatch(isLoading(true));
            loadFilterData(iValue, dispatch);
            return loadCategoryData(iValue, getState()[ModMap.Categories].filters[iValue], dispatch);
        }
    };
}


export function applyFilter(iValue) {
    return (dispatch, getState) => {
        let _category = getState()[ModMap.Categories].curCategory;
        writeFiltersData({...getState()[ModMap.Categories].filters, [_category]:iValue} );
        dispatch(updateFilterSettings({[_category] : iValue}));

        dispatch(isLoading(true));
        return loadCategoryData(_category, iValue, dispatch);
    };
}

export function readFiltersData() {
    return (dispatch) => (
        AsyncStorage.getItem('filters').then( filters => {
            dispatch(updateFilterSettings(JSON.parse(filters)));
        })
    );
}

function writeFiltersData(iData) {
    AsyncStorage.setItem('filters', JSON.stringify(iData));
}