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

// collection fooods から collection constitutions_index を作成
exports.update = functions.firestore.document('foods/{id}').onWrite(
    async (snap, context) => {
        const newValue = snap.after.data(); // 更新後のデータ
        const previousValue = snap.before.data(); // 更新前のデータ
        
        const constitutionsIndexRef = firestore.collection('constitutions_index')
        for(const [key, value] of Object.entries(newValue.constitutions)) {
            const foodsId = firestore.collection('foods').doc(context.params.id).path.replace('/', '_')
            const res = await constitutionsIndexRef.doc(`${key}`).collection(`_${value}`).doc(foodsId).set({
                foodRef: firestore.collection('foods').doc(context.params.id)
            })
            await constitutionsIndexRef.doc(`${key}`).collection(`_${!value}`).doc(foodsId).delete()
        }
        return true  
    }
)