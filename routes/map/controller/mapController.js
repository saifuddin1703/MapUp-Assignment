const fs = require('fs');
const file = fs.readFileSync('./data/lines.json', 'utf-8');
const turf = require('@turf/turf');
const lines = JSON.parse(file);

// console.log(lines[0]);
module.exports = {

    async findIntersection(req, res, next) {

        if(!req.body){
            return next(new AppError('Please provide a long line string', 400));
        }

        const lineString = req.body;

        const line1 = turf.lineString(lineString.coordinates);
        console.log(line1);

        const intersections = [];

        lines.map((line,index) => {
            // const line2 = turf.lineString(line.line.coordinates);
            console.log(line1);
            console.log(line.line);
            const intersection = turf.lineIntersect(line1.geometry, line.line);
            console.log('intersection')
            console.log(intersection)
            if(intersection.features.length > 0){
                intersections.push({
                    id : index+1,
                    intersection : intersection.features[0].geometry.coordinates
                });
            }
        });

        res.status(200).json({
            status : 'success',
            intersections
        });
    }
}; 


