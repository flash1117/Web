<template>
    <v-container fluid>

    <v-layout 
        style="max-width: 700px" 
        class="white pa-5 text-center"
    >
        <div class="mx-auto">
            <v-btn v-if="!disable" @click="connect"
                   text color="red" outlined class="mx-3">연결시작
            </v-btn>
            <v-btn v-else @click="disConnect"
                   text color="blue" outlined class="mx-3 ">연결해지
            </v-btn>
        </div>

        <div>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                            v-model="value"
                            outlined
                            name="input-7-4"
                            class="mt-5"
                            label="코드를 입력하세요"
                            placeholder="..."
                            @keydown="sendText(value)"
                            type="text"
                    />
                </v-col>
                <v-col cols="12" class="text-left">
                    <div
                            class="pa-5"
                            style="border: 1px solid black">
                        {{text}}
                    </div>
                </v-col>
            </v-row>
        </div>
        
    </v-layout>
    </v-container>
    
</template>

<script>
    import SockJs from 'sockjs-client'
    import Stomp from 'webstomp-client'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                text: '',
                value: '',
                disable: false,
                stompClient: null,
                url: 'http://localhost:8080'

            }
        },
        methods: {
            connect() {
                let socket = new SockJs(this.url + '/gs-guide-websocket');
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({}, frame => {
                    this.changeDisable();
             //       console.log('Connected: ' + frame);
                    this.stompClient.subscribe('/topic/greetings', message => this.setText(JSON.parse(message.body).content));
                })
            },
            disConnect() {
                if (this.stompClient !== null) {
                    this.stompClient.disconnect();
                }
                this.changeDisable();
             //   console.log("Disconnected");
            },
            sendText(value) {
                this.stompClient.send('/app/hello', JSON.stringify({'name': value}),);
            },
            changeDisable() {
                this.disable = !this.disable;
            },
            setText(message) {
                this.text = message;
            },
        }
    };
</script>
