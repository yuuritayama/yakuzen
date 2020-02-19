const functions = require('firebase-functions');

// cloud functionでfirestoreを使うのに必要な設定は以下の２行
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
const firestore = admin.firestore()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.update = functions.firestore.document('foods/{id}').onWrite(
    async (snap, context) => {
        const newValue = snap.after.data(); // 更新後のデータ
        const previousValue = snap.before.data(); // 更新前のデータ
        console.log(newValue, previousValue)
        console.log(newValue.constitutions, newValue['constitutions'])

        const constitutionsIndexRef = firestore.collection('constitutions_index')
        for(const [key, value] of Object.entries(newValue.constitutions)) {
            console.log(key, value)
            const res = await constitutionsIndexRef.doc(`${key}_${value}`).set({
                foodRef: firestore.collection('foods').doc(context.params.id)
            })
        }
        return true  
    }
)