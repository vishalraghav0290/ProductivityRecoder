// File: /Users/vishalraghav/Documents/focuslabProject/backend/src/controllers/index.ts

const UserController = require('../db/schema/user');
const ActivityController = require('../db/schema/activity');
const SubActivityController = require('../db/schema/subActivity');
const ActivityLogController = require('../db/schema/activityLog');
const SubscriptionController = require('../db/schema/subscription');
const PaymentController = require('../db/schema/payment');
const TaskController = require('../db/schema/task');
const AIProfileController = require('../db/schema/aiProfile');

// Exporting all controllers for use in routes
module.exports = {
    UserController,
    ActivityController,
    SubActivityController,
    ActivityLogController,
    SubscriptionController,
    PaymentController,
    TaskController,
    AIProfileController,
};