'use strict';

/**
 * a-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::a-post.a-post');
