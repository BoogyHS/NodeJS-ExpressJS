const { tripModel, userModel } = require('../models');

function home(req, res, next) {
    const { user, isLogged } = req;

    res.render('home', { user, isLogged });
}

function getSharedTrips(req, res, next) {
    const { user, isLogged } = req;

    tripModel.find()
        .then(trips => {
            res.render('sharedTrips', { trips, user, isLogged });
        })
        .catch(next)
}

function about(req, res, next) {
    const { user, isLogged } = req;

    res.render(`about`, { user, isLogged });
}

function getCreate(req, res) {
    const { user, isLogged } = req;
    res.render(`create`, { user, isLogged });
}

function postCreate(req, res, next) {

    const { startend, datetime, description, carImage, seats } = req.body;
    const { user } = req;
    const startPoint = startend.split('-')[0].trim();
    const endPoint = startend.split('-')[1].trim();
    const date = datetime.split('-')[0].trim();
    const time = datetime.split('-')[1].trim();

    tripModel.create({ startPoint, endPoint, date, time, description, carImage, seats, creatorId: user._id })
        .then(createdTrip => {
            res.redirect('/shared-trips');
        })
        .catch(next);
}

function getEdit(req, res, next) {
    const id = req.params.id;
    const { user, isLogged } = req;

    tripModel.updateOne({ _id: id }, { $push: { buddies: user._id } })
        .then(updatedTrip => {
            res.redirect('/shared-trips');
        })
        .catch(next)
}

// function postEdit(req, res) {
//     const id = req.params.id;
//     const { name, description, imageUrl, difficultyLevel } = req.body;
//     const { user } = req;

//     cubeModel.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel, creatorId: user._id })
//         .then(updatedCube => {
//             res.redirect('/');
//         });
// }

function getDetails(req, res, next) {
    const id = req.params.id;
    const { user, isLogged } = req;
    let isCreator = false;
    let isJoined = false;
    let isFreeSpace = false;

    tripModel.findById(id)
        .populate('buddies')
        .populate('creatorId')
        .then(trip => {
            if (trip.creatorId) {
                if (trip.creatorId._id.toString() === user._id.toString()) {
                    isCreator = true;
                }
            }
            if (trip.buddies) {
                if (trip.buddies.length < trip.seats) {
                    isFreeSpace = true;
                }

                // console.log(trip.buddies)
                // userModel.countDocuments({ _id: user._id }, function (err, count) {
                //     if (count > 0) {
                //         isJoined=true
                //     }
                // })
                // .then(()=>{
                //     res.render(`details`, { trip, isCreator, user, isLogged, isJoined, isFreeSpace });
                //     return
                // });
            }
            res.render(`details`, { trip, isCreator, user, isLogged, isJoined, isFreeSpace });
        })
        .catch(next)
}

// function getDelete(req, res, next) {
//     const id = req.params.id;
//     const { user, isLogged } = req;
//     //todo if cube don't exist
//     cubeModel.findOne({ _id: id, creatorId: user._id })
//         .then(cube => {
//             const options = [
//                 { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
//                 { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
//                 { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
//                 { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
//                 { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
//                 { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 },
//             ]
//             res.render('delete', { cube, options, isLogged });
//         })
//         .catch(next)
// }

function getDelete(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    // models.cubeModel.findByIdAndDelete({ _id: id, creatorId: user._id })
    tripModel.deleteOne({ _id: id, creatorId: user._id })
        .then(() => {
            res.redirect('/shared-trips');
        })
}

module.exports = {
    home,
    getSharedTrips,
    about,
    getCreate,
    postCreate,
    getDetails,
    getEdit,
    getDelete,
}