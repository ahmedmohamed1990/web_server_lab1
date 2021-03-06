const { ApolloServer, gql } =require ('apollo-server'); 
 
const users = [ 
    { name: "ahmed", dob: "1996" }, 
    { name: "mohamed", dob: "1995" }, 
    { name: "hema", dob: "1995" }, 
]; 
 
const articals = [ 
    { 
        title: "test", body: "body test", comments: [ 
 
            { content: "comment 1", username: "hema" }, 
            { content: "comment 2", username: "ahmed" }, 
            { content: "comment 3", username: "mohamed" }, 
 
 
        ] 
    }, 
    { title: "test1", body: "body test2" }, 
    { title: "test2", body: "body test3" }, 
    { title: "test3", body: "body test4" }, 
] 
 
 
// schema 
const typeDefs = gql` 
    type User { 
        name: String! 
        dob: String! 
        articals (lastArticals: Int!): [Artical] 
    } 
 
    type Artical { 
        title: String! 
        body: String! 
        comments: [Comment] 
    } 
 
    type Comment{ 
 
        content: String! 
        username: String! 
 
    } 
 
     
    union SearchResult = Artical | User | Comment 
 
    # query root type 
    type Query { 
        # query to fetch all users 
        allUsers (last: Int!): [User] 
        userById (id: String): User 
        search (keyword: String): SearchResult 
        someArticles (lastArticals: Int!): [Artical] 
        allArticles: [Artical] 
    } 
 
    # mutation root type 
    type Mutation { 
        createUser (name: String!, dob: String!): [User] 
        deleteArticle (title: String! ): [Artical] 
        createArtical (title: String!, body: String! ): [Artical] 
 
         
    } 
` 
const resolvers = { 
    Mutation: { 
        createUser: (_, args, ctx) => { 
            console.log(args); 
            users.push(args); 
            return users; 
        }, 
        createArtical: (_, args, ctx) => { 
            articals.push(args); 
            return articals; 
 
        }, 
        deleteArticle: (_, args, ctx) => { 
 
            var newArticals = []; 
            for (var i = 0; i < articals.length; i++) { 
                console.log(articals[i]["title"], args.title) 
                if (articals[i]["title"] != args.title) 
                    newArticals.push(articals[i]); 
 
            } 
            return newArticals; 
 
        } 
    }, 
    Query: { 
        allUsers: (_, args, ctx) => { 
            if (!ctx.isLogged) throw Error('user is not authentication'); 
            const result = users.slice(-args.last); 
            return [...result]; 
        }, 
        allArticles: () => { 
            return articals; 
        }, 
        someArticles: (parent, args, ctx) => { 
            return articals.slice(-args.lastArticals); 
        } 
    }, 
    // User: { 
    //     articals(parent, args, ctx) { 
    //         console.log('context in posts: ', ctx); 
    //         if (!ctx.isLogged) throw Error('need to authenticate'); 
    //         return articals.slice(-args.lastArticals); 
    //     } 
    // } 
} 
 
 
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({ req }) => { 
        let isLogged = false; 
        const token = req.headers.authorization; 
        if (token === '123456') isLogged = true 
        return { 
            isLogged 
        } 
    } 
}); 
server.listen(8000).then(({ port }) => { console.log('the server is listening on: ', port) });