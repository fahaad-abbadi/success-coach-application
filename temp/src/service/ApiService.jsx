import axios from "axios";
import CryptoJS from "crypto-js";

export default class ApiService {

    static BASE_URL = "http://localhost:5000/api";
    static ENCRYPTION_KEY = "phegon-dev-inventory";

    //encrypt data using cryptoJs
    static encrypt(data) {
        return CryptoJS.AES.encrypt(data, this.ENCRYPTION_KEY.toString());
    }

    //decrypt data using cryptoJs
    static decrypt(data) {
        const bytes = CryptoJS.AES.decrypt(data, this.ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    //save token with encryption
    static saveToken(token) {
        const encryptedToken = this.encrypt(token);
        localStorage.setItem("token", encryptedToken)
    }

    // retreive the token
    static getToken() {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;
        return this.decrypt(encryptedToken);
    }

    //save Role with encryption
    static saveRole(role) {
        const encryptedRole = this.encrypt(role);
        localStorage.setItem("role", encryptedRole)
    }

    // retreive the role
    static getRole() {
        const encryptedRole = localStorage.getItem("role");
        if (!encryptedRole) return null;
        return this.decrypt(encryptedRole);
    }

    static clearAuth() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static getHeader() {
        const token = this.getToken();
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    /**  AUTH && USERS API */
    static async registerUser(registerData) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registerData)
        return response.data;
    }


    static async loginUser(loginData) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
        return response.data;
    }

    //CHECK OUT THIS
    static async getCurrentUser() {
        const response = await axios.get(`${this.BASE_URL}/users/current`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getUserById(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async updateUser(userId, userData) {
        const response = await axios.put(`${this.BASE_URL}/users/update/${userId}`, userData, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // POST Endpoints
    static async createPost(postData){
        const response = await axios.post(`${this.BASE_URL}/posts/add`, postData, {
            headers: this.getHeader()
        });

        return response.data;
    }

    static async getAllPosts() {
        const response = await axios.get(`${this.BASE_URL}/posts/all`, { headers: this.getHeader() });
        return response.data;
    }

    static async getPostById(postId) {
        const response = await axios.get(`${this.BASE_URL}/posts/${postId}`, { headers: this.getHeader() });
        return response.data;
    }

    static async updatePost(postId, postData) {
        const response = await axios.put(`${this.BASE_URL}/posts/update/${postId}`, postData, { headers: this.getHeader() });
        return response.data;
    }

    static async deletePost(postId) {
        const response = await axios.delete(`${this.BASE_URL}/posts/delete/${postId}`, { headers: this.getHeader() });
        return response.data;
    }

    /** === COMMENT ENDPOINTS === */
    static async addComment(postId, commentData) {
        const response = await axios.post(`${this.BASE_URL}/comments/add/${postId}`, commentData, { headers: this.getHeader() });
        return response.data;
    }

    static async getCommentsByPostId(postId) {
        const response = await axios.get(`${this.BASE_URL}/comments/post/${postId}`, { headers: this.getHeader() });
        return response.data;
    }

    static async getCommentById(commentId) {
        const response = await axios.get(`${this.BASE_URL}/comments/${commentId}`, { headers: this.getHeader() });
        return response.data;
    }

    static async deleteComment(commentId) {
        const response = await axios.delete(`${this.BASE_URL}/comments/delete/${commentId}`, { headers: this.getHeader() });
        return response.data;
    }

    /** === CATEGORY ENDPOINTS === */
    static async createCategory(categoryData) {
        const response = await axios.post(`${this.BASE_URL}/categories/add`, categoryData, { headers: this.getHeader() });
        return response.data;
    }

    static async getAllCategories() {
        const response = await axios.get(`${this.BASE_URL}/categories/all`, { headers: this.getHeader() });
        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/categories/${categoryId}`, { headers: this.getHeader() });
        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/categories/delete/${categoryId}`, { headers: this.getHeader() });
        return response.data;
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        this.clearAuth()
    }

    static isAuthenticated(){
        const token = this.getToken();
        return !!token;
    }

    static isAdmin(){
        const role = this.getRole();
        return role === "ADMIN";
   }

}