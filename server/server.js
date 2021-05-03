require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tokenAuth } = require('./middlewares/tokenauth');
const { adminAuth } = require('./middlewares/adminauth');
const { redisClient } = require('./utilities/utlities');
const { createUrl, loginUser, getUserUrls, updateUser, registerUser, deleteUser, getHashedUrl, prisma } = require('./middlewares/prismaqueries');
const PORT = process.env.PORT || '5000';

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.post('/login', loginUser, async (req, res) => {
	try {
		const hashResponse = await bcrypt.compare(req.body.password, req.user.password);
		if (hashResponse) {
			const accessToken = await jwt.sign(
				{
					id: req.user,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: '20m',
				}
			);
			console.log('req.user', req.user);
			res.status(200).send({
				user: {
					id: req.user,
					role: req.user,
					email: req.user,
					token: accessToken,
				},
			});
		} else {
			res.status(401).send('Password is incorrect');
		}
	} catch (error) {
		res.status(500).send();
	}
});

app.post('/register', registerUser, (req, res) => {
	res.status(201).json({ msg: 'Successfully added user' });
});

app.put('/update:id', tokenAuth, adminAuth, updateUser, async (req, res) => {
	res.status(201).json({ msg: 'Successfully updated user' });
});

app.get('/users', tokenAuth, adminAuth, async (req, res) => {
	const users = await prisma.users.findMany();
	res.send(users);
});

app.delete('/delete:id', tokenAuth, adminAuth, deleteUser, async (req, res) => {
	res.status(201).json({ msg: 'Successfully deleted user' });
});

app.get('/userurls:userId', getUserUrls, async (req, res) => {
	return res.status(200).send(req.urls);
});

app.post('/createurl', createUrl, (req, res) => {
	return res.status(201).json({ msg: 'Successfully created url', Url: req.newUrl });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(getHashedUrl, (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`server is working on port:${PORT}`);
});
