const app = Vue.createApp({


});

app.component('khanhnq', {
    data() {
        return {
            message: 'Loading..',
            posts: [
                // {title: 'post 1', body: 'content 1'},
                // {title: 'post 2', body: 'content 2'}
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
                this.message = 'where the heck is my message im not blind';
            }
        )//.fail (
            //(err) => {
                //this.message="This is error"
            //}
        //)

        fetch ('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            return response.json();
        }).then((data) => {
            this.posts = data;
            this.message = '';
        }).catch(err =>{
            this.message = "Failed";
        });

    }

    
});

app.component('yolo', {
    data() {
        return {
            title: '',
            body: ''
        }
    },
    template: `
    {{message}}
    <form @submit="handleSubmit">
        <div>
            <label for="title">Title</label>
            <input type="text" v-model="title" id="title">
        </div>

        <div>
            <label for="body">Body</label>
            <input type="text" v-model="body" id="body">
        </div>
        <button>Submit</button>
    </form>`,

    method: {
        handleSubmit(event) {
            event.preventDefault(); //stop redirect to action url -he said
            
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                data: JSON.stringify({
                    title: this.title,
                    body: this.body, 
                    userID: 1
                }),
                header: {
                    'Content-Type' : 'application/json'
                }
            }). then(response => {
                return response.json();
            }). then(data =>  {
                this.message = 'create successfully'
            }).catch(error => 
                this.message = 'error'
            )
        }
    }
})
app.mount('#app')