import { get, post, put, upload } from './apiConfig.js';

const baseUrl = 'https://api.qiandengli.com/v1/';

export default {
  getCode(params, callback) {
    return get(`${baseUrl}mini-program/session-key?code=${params}`, callback);
  },
  postDecode(params, callback) {
    return post(`${baseUrl}mini-program/decode`,params, callback)
  },
  postSuggest( { data ,pics} , callback) {
    return post(`${baseUrl}member/suggest`,{ content: data ,pics:pics}, callback)
  },
  postImages( { pics } , callback) {
    return post(`${baseUrl}file/images`,{ file: pics }, callback)
  },
  postLeader( params , callback) {
    return post(`${baseUrl}member/leader`,params, callback)
  },
  getInfo(callback) {
    return get(`${baseUrl}member/my/info`,callback);
  },
  getClist(params,callback) {
    return get(`${baseUrl}member/my/clist?type=${params.type}&page=${params.page}`,callback);
  },
  getOrderList(params, callback) {
    return get(`${baseUrl}order/order/list?status=${params.status}&page=${params.page}`, callback);
  },
  getTuanlistList(params, callback) {
    return get(`${baseUrl}order/order/tuanlist?status=${params.status}&page=${params.page}`, callback);
  },
  getDetail({id , course_tuan_creater_id}, callback) {
    return get(`${baseUrl}order/order/main?course_id=${id}&share_id=${course_tuan_creater_id}`,callback);
  },
  getMiniProgramPay(params, callback){
    return get(`${baseUrl}mini-program-pay?course_id=${params.course_id}&share_id=${params.share_id}&course_tuan_creater_id=${params.course_tuan_creater_id}&is_pin=${params.is_pin}`,callback);
  },
  getmymain(callback){
    return get(`${baseUrl}order/order/mymain`,callback);
  },
  getKaituan(params, callback){
    return get(`${baseUrl}order/order/kaituan?course_id=${params.id}`,callback);
  },
  getMaintuanList(params, callback){
    return get(`${baseUrl}order/order/maintuan?course_id=${params.id}`,callback);
  },
  getShare(params, callback){
    return get(`${baseUrl}order/order/share?course_id=${params.course_id}&course_tuan_creater_id=${params.userID}`,callback);
  },
  postCode(params, callback){
    return post(`${baseUrl}sms/sent`,params,callback);
  },
  /**
   * new
   *   */
  getMain(callback){
    return get(`${baseUrl}course/course/main`,callback);
  },
  getCourselist(params, callback) {
    return get(`${baseUrl}course/course/courselist?pid=${params.pid}&id=${params.id}`,callback)
  },
  getCourseDes({id}, callback) {
    return get(`${baseUrl}course/course/des?id=${id}`,callback)
  },
  getDiscuss({id}, callback) {
    return get(`${baseUrl}course/course/discuss?course_id=${id}`,callback)
  },
  getLabels( callback) {
    return get(`${baseUrl}member/my/labels`, callback)
  },
  getBuyed( params, callback) {
    return get(`${baseUrl}order/order/buyed?status=${params.status}&page=${params.page}`, callback)
  },
  getDakades( params, callback) {
    return get(`${baseUrl}course/course/dakades?id=${params.id}&page=${params.page}`, callback)
  },
  postCreateBbs( params, callback) {
    return post(`${baseUrl}course/course/create-bbs`, params, callback)
  }
};