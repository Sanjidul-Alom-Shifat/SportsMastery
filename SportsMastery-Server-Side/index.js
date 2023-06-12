const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SECRECT_KEY);
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// middleware for verify jwt
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    // bearer token
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })
}


// mongodb connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q5tkpfw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const usersCollection = client.db('SportsMastery').collection('users');
        const classCollection = client.db('SportsMastery').collection('allClasses');
        const selectedClassesCollection = client.db('SportsMastery').collection('selectClasses');
        const enrolledClassesCollection = client.db('SportsMastery').collection('enrollClasses');
        const paymentsCollection = client.db('SportsMastery').collection('payments');


        // jwt token
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });
            res.send({ token });
        })

        // Warning: use verifyJWT before using verifyAdmin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            // if (user?.role !== 'admin') {
            // if (!user || user.role !== 'admin')
            if (user?.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }

        // Warning: use verifyJWT before using verifyInstructor
        const verifyInstructor = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            // if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
            if (user.role !== 'instructor') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }

        // Warning: use verifyJWT before using verifyInstructor
        const verifyStudent = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            // if (!user || (user.role !== 'atudent' && user.role !== 'admin')) {
            if (user.role !== 'student') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }

        // post the user in api
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            user.role = 'student';
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                console.log('User already exists');
                return res.send({ message: 'User already exists' });
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // get : the users from server
        app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        // delete : to delete specific user
        app.delete('/users/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // for patch : to make user an admin
        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };

            const updateUser = {
                $set: {
                    role: 'admin'
                },
            };

            const result = await usersCollection.updateOne(query, updateUser);
            res.send(result);
        })

        // to get : verify admin
        app.get('/users/admin/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ admin: false })
            }
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { admin: user?.role === 'admin' }
            res.send(result);
        })


        // for patch : make user an instructor
        app.patch('/users/instructor/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };

            const updateUser = {
                $set: {
                    role: 'instructor'
                },
            };

            const result = await usersCollection.updateOne(query, updateUser);
            res.send(result);
        })

        // to get : verify admin
        app.get('/users/instructor/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ instructor: false })
            }
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { instructor: user?.role === 'instructor' }
            res.send(result);
        })

        // for patch : make user an instructor
        app.patch('/users/student/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };

            const updateUser = {
                $set: {
                    role: 'student'
                },
            };

            const result = await usersCollection.updateOne(query, updateUser);
            res.send(result);
        })

        // to get : verify admin
        app.get('/users/student/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ student: false })
            }
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { student: user?.role === 'student' }
            res.send(result);
        })
        //////

        // get the specific instructor classes.
        app.get('/classes', verifyJWT, verifyInstructor, async (req, res) => {
            console.log(req.query.email);
            let query = {};
            if (req.query?.email) {
                query = { instructorEmail: req.query.email }
            }
            const result = await classCollection.find(query).toArray()
            res.send(result)
        })

        // for post : add class from instructor
        app.post('/classes', async (req, res) => {
            const classItem = req.body;
            // classItem.status = 'pending'; // Set the status as 'pending
            const result = await classCollection.insertOne(classItem);
            res.send(result);
        })


        // for get : the all classes
        app.get('/allclasses', async (req, res) => {
            const result = await classCollection.find().toArray();
            res.send(result);
        })

        // for put : update the feedback in a modal
        app.put('/classes/feedback/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const classInfo = req.body;
            const options = { upsert: true }
            console.log(classInfo);
            const updateFeedback = {
                $set: {
                    feedback: classInfo.feedback
                }
            };
            const result = await classCollection.updateOne(query, updateFeedback, options);
            res.send(result);
        })

        // for show feedback
        app.get('/classes/showFeedback/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await classCollection.findOne(query);
            res.send(result);
            console.log(result);
        })

        // for put : the status update
        // make class status approved
        app.patch('/classes/approve/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }; // Update the filter to match the email field
            const updatedDoc = {
                $set: {
                    status: "approved",
                },
            };
            const result = await classCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        // make class status deny
        app.patch('/classes/deny/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }; // Update the filter to match the email field
            const updatedDoc = {
                $set: {
                    status: "denied",
                },
            };
            const result = await classCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        // for display all the instructor : by get operation
        app.get('/instructors', async (req, res) => {
            // const role = req.query.role;
            const role = 'instructor';
            const query = { role: role };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        // for display approved card
        app.get('/approvedCard', async (req, res) => {
            const status = 'approved';
            const query = { status: status };
            const result = await classCollection.find(query).toArray();
            // console.log(result);
            res.send(result);
        })


        // home page : popular instructors
        app.get('/popularInstructors', async (req, res) => {
            const role = 'instructor';
            const query = { role: role };
            const result = await usersCollection.find(query).limit(6).toArray();
            res.send(result);
        })


        //students
        //for select the class and get to the my select page
        app.get('/selectedClasses/:email', verifyJWT, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { studentEmail: email };
            console.log(query);
            const result = await selectedClassesCollection.find(query).toArray();
            // console.log(result);
            res.send(result);
        })

        // for delete class
        app.delete('/selectedClasses/:id', verifyJWT, verifyStudent, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await selectedClassesCollection.deleteOne(query);
            // console.log(result);
            res.send(result);
        })

        // for select the class and post to the my select page
        app.post('/selectedClasses', async (req, res) => {
            const selectedClass = req.body;
            const result = await selectedClassesCollection.insertOne(selectedClass);
            res.send(result);
        })

        // for select the class and payment it
        app.get('/selectClass/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await selectedClassesCollection.find(query).toArray();
            // console.log(result);
            res.send(result);
        })

        // payment
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const { price } = req.body;
            console.log(price);
            const amount = price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
            })
        });

        // payment 
        app.post('/payments', verifyJWT, async (req, res) => {
            const payment = req.body;
            console.log(payment);
            const insertedResult = await paymentsCollection.insertOne(payment); // ok

            const queryClass = {
                _id: new ObjectId(payment.selectedClassId)
            };

            const query = {
                selectClassId: payment.selectedClassId
            };

            const findEnrolledClasses = await selectedClassesCollection.findOne(query);
            const insertOnEnrollment = await enrolledClassesCollection.insertOne(findEnrolledClasses);
            const deletedResult = await selectedClassesCollection.deleteOne(query);

            const updateClass = {
                $inc: {
                    availableSeats: -1,
                    enrolled: 1
                }
            }

            const updateClassCollection = await classCollection.updateOne(queryClass, updateClass);
            res.send({ insertedResult, deletedResult, insertOnEnrollment, updateClassCollection });
        })
        // payment

        // payment history query by email
        app.get('/paymentSuccessfull/:email', verifyJWT, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await paymentsCollection.find(query).sort({ date: -1 }).toArray();
            res.send(result);
        })

        // enrolled class 
        app.get('/enrolledStudent/:email', verifyJWT, verifyStudent, async (req, res) => {
            const email = req.params.email;
            const query = { studentEmail: email };
            const result = await enrolledClassesCollection.find(query).toArray();
            res.send(result);
        })

        // top classes base on enroll by student
        app.get('/topClasses', async (req, res) => {
            const result = await classCollection.find().sort({ enrolled: -1 }).limit(6).toArray();
            res.send(result);
        })
        // finished

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// test
app.get('/', (req, res) => {
    res.send('SportsMastery is running now successfully')
})

app.listen(port, () => {
    console.log(`SportsMastery running on port ${port}`);
})