<template>

    <v-app>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
       
         <HelloWorld/>
        <testComponent/>
           
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld';
    import testComponent from './components/TestComponent';
    export default {
        name: 'App',

        components: {
            HelloWorld,
            testComponent,
        },

    };
</script>