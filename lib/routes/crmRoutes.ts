import {Request, Response , NextFunction} from "express";
import {ContactController} from "../controllers/crmController";



export class Routes {

  public contactController: ContactController =new ContactController();


  public routes(app): void {

    app.route('/')
    .get( (req : Request , res: Response) => {
      res.status(200).send({
        message : 'GET request is successful !!!'
      })
    })
    // Contact
       app.route('/contact')
       // GET endpoint
       /*
       .get((req: Request, res: Response) => {
       // Get all contacts
           res.status(200).send({
               message: 'GET request successfulll!!!!'
           })
       })
       */
       .get((req : Request , res: Response , next:NextFunction) => {
         //middleware stuff
         if(req.query.key !== 'd9a3489c70f93b30f72ef0ce5317d08e9097996f'){
           res.status(401).send('You shall not pass!') ;
         }
         else {
           next();
         }
       },
         this.contactController.getContacts
       )
       // POST endpoint
       /*
       .post((req: Request, res: Response) => {
       // Create new contact
           res.status(200).send({
               message: 'POST request successfulll!!!!'
           })
       })
       */
       .post(this.contactController.addNewContact)

       // Contact detail
       app.route('/contact/:contactId')
       // get specific contact
       /*
       .get((req: Request, res: Response) => {
       // Get a single contact detail
           res.status(200).send({
               message: 'GET request successfulll!!!!'
           })
       })
       */
       .get(this.contactController.getContactWithID)
       /*
       .put((req: Request, res: Response) => {
       // Update a contact
           res.status(200).send({
               message: 'PUT request successfulll!!!!'
           })
       })
       */
       .put(this.contactController.updateContact)
       /*
       .delete((req: Request, res: Response) => {
       // Delete a contact
           res.status(200).send({
               message: 'DELETE request successfulll!!!!'
           })
       })
       */
       .delete(this.contactController.deleteContact)
  }
}
