const app = Vue.createApp({


});

app.component('khanhnq', {
    data() {
        return {
            message: 'Hello, welcome',
            posts: [
                {title: 'post 1', body: 'content 1'},
                {title: 'post 2', body: 'content 2'}
        ]
        }
    },

    template:  `
    <strong>{{message}}</strong>
    <ul>
        <li v-for="post in posts">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
        </li>
    </ul>`,

    mounted() {
        $.getJSON(
            'https://jsonplaceholder.typicode.com/posts',
            data => {
                this.posts = data;
                this.message = '';
            }
        );

    },

    
});

app.mount('#app')