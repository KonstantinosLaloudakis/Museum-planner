 <?php
require 'conn.php';
    session_start();
	include "database.php";
if (!(isset($_SESSION['name'])))
{
header ("location: ../index.html");
die;
}


$username=$_SESSION['name'];
	
	 
	 $id_query = mysqli_query($con,"SELECT user_id FROM users WHERE username = \"$username\"");
$id=mysqli_fetch_row($id_query);

$result = mysqli_query($con, "SELECT * FROM user_rooms WHERE user_id = \"$id[0]\"");
?> 

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>museumplanner HELP</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/dashboard/">

    <!-- Bootstrap core CSS -->
<link href="../assets/dist/css/bootstrap.css" rel="stylesheet">

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
    <!-- Custom styles for this template -->
    <link href="../css/dashboard.css" rel="stylesheet">
  </head>
  <body>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" > 
  <span data-feather="user"></span>
 <?php if (isAuthenticated()) {  
		            echo $_SESSION['name']; 
					}  ?></a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="logout.php">
	  <span data-feather="log-out"></span>
	  Log out</a>
    </li>
  </ul>
</nav>

<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" href="public.php">
              <span data-feather="plus-square"></span>
              Create your own museum
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="load_museums.php">
              <span data-feather="loader"></span>
              Load museum
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="User_manual.php">
              <span data-feather="help-circle"></span>
              Help<span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>

       
      </div>
    </nav>

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
		<div id="accordion">

		  <div class="card">
			<div class="card-header" id="headingOne">
			  <h5 class="mb-0">
				<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
				  Είσοδος στην εφαρμογή
				</button>
			  </h5>
			</div>

			<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
			  <div class="card-body">
				  Μόλις εκκινήσετε την εφαρμογή εμφανίζεται η ακόλουθη φόρμα διασύνδεσης. <br>
          <img src="../images/usermanual/login_page.png"  width="500" height="300"><br>
            Τα στοιχεία που πρέπει να συμπληρώσετε για την είσοδό σας είναι:
            <ul>
              <li>Όνομα Χρήστη Το username που έχετε επιλέξει </li> 
               <li> Κωδικός Ο κωδικός πρόσβασης που επιλέξατε κατά την εγγραφή σας στην εφαρμογή </li> 
             </ul>
            Αφού εισαγάγετε τα σωστά στοιχεία, θα ανακατευθυνθείτε στην αρχική σας σελίδα.<br>
            <img src="../images/usermanual/main_page.png"  width="500" height="300"><br>
            <p>
            Πάνω αριστερά μπορείτε να παρατηρήσετε το username σας, ενώ από κάτω υπάρχει το menu,
			από το οποίο μπορείτε να μεταφερθείτε σε όλες τις διαθέσιμες διαδικασίες.
			Στο κέντρο εμφανίζεται ένας πίνακας με τα ονόματα όλων των μουσείων, που έχετε ήδη δημιουργήσει.
            Αν δεν έχετε δημιουργήσει κάποιο μουσείο μέχρι στιγμής, τότε σε εκείνο το σημείο θα εμφανίζεται το ακόλουθο κείμενο.<br>
            <img src="../images/usermanual/main_page_empty.png"  width="500" height="300"><br>
            <p>

			  </div>
			</div>
		  </div>
		  <div class="card">
			<div class="card-header" id="headingTwo">
			  <h5 class="mb-0">
				<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				 Εγγραφή νέου χρήστη
				</button>
			  </h5>
			</div>
			<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
			  <div class="card-body">
				Αν δεν έχετε ήδη δημιουργήσει κάποιο λογαριασμό στην εφαρμογή μας, σας δίνεται η δυνατότητα να το κάνετε δωρεάν,
				κάνοντας κλικ στον υπερσύνδεσμο Sign up, στην αρχική σελίδα.<br>
        <img src="../images/usermanual/signup.png"  width="500" height="300"><br>
        Με αυτό τον τρόπο θα μεταφερθείτε σε μία άλλη σελίδα, όπου θα υπάρχει η ακόλουθη φόρμα προς συμπλήρωση.<br>
         <img src="../images/usermanual/signup1.png"  width="500" height="300"><br>
         Για την επιτυχή εγγραφή σας στην εφαρμογή θα πρέπει να συμπληρώσετε τα παρακάτω στοιχεία:
         <ol>
              <li>Όνομα Χρήστη</li> 
              <li>Όνομα</li>  
              <li>Επώνυμο</li>  
              <li>Ημερομηνία Γέννησης</li> 
              <li>Διεύθυνση ηλεκτρονικού ταχυδρομείου</li>  
              <li>Κωδικός Χρήστη (2 φορές για επαλήθευση)</li>  
          </ol>    
        Αν όλα τα στοιχεία, που εισαγάγατε είναι αποδεκτά, τότε μεταφέρεστε ξανά στην σελίδα εισόδου, όπου πρέπει να ακολουθήσετε τα βήματα, που αναλύσαμε παραπάνω (φόρμα εισόδου).

			  </div>
			</div>
		  </div>

      <div class="card">
      <div class="card-header" id="headingThree">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Αποχώρηση από την εφαρμογή (logout)
        </button>
        </h5>
      </div>
      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body">
        Για να αποχωρήσετε από την εφαρμογή αρκεί να πατήσετε στο κουμπί Log Out, το οποίο βρίσκεται πάνω δεξιά στη σελίδα σας.<br>
         <img src="../images/usermanual/logout.png"  width="500" height="300"><br>
        </div>
      </div>
      </div>

      <div class="card">
      <div class="card-header" id="headingFour">
          <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            Δημιουργία νέου μουσείου
          </button>
          </h5>
        </div>
        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
          <div class="card-body">
           <img src="../images/usermanual/create_museum.png"  width="500" height="300"><br>
           Για να ξεκινήσετε τη δημιουργία ενός νέου μουσείου, αρκεί να πατήσετε το κουμπί Create your own museum, που βρίσκεται στο menu, στην αριστερή πλευρά της σελίδας, κάτω από το όνομα χρήστη σας. Αφού το πατήσετε, μεταφέρεστε σε μία νέα ιστοσελίδα. <br>
            <img src="../images/usermanual/create_museum_page.png"  width="500" height="300"><br>
            Σε αυτή την ιστοσελίδα, όπως μπορείτε να παρατηρήσετε εμφανίζεται και πάλι το username σας, πάνω αριστερά. Από κάτω υπάρχει ένα καινούριο menu με τα παρακάτω στοιχεία:
            <ol>
                <li>Έκθεμα</li> 
                <li>Μεγάλος Τοίχος</li>
                <li>Τοίχος</li>
               <li>Πόρτα</li> 
            </ol>
             <img src="../images/usermanual/toolkit.png"  width="500" height="300"><br>
             Επίσης δίπλα από το username, υπάρχουν και 3 buttons, κάθε ένα από τα οποία είναι υπεύθυνο για μία διαφορετική λειτουργία.<br>
              <img src="../images/usermanual/toolkit1.png"  width="500" height="300"><br>
              <ul>
              <li>Σπίτι -> Επιστροφή στην αρχική σελίδα</li> 
              <li>Δίσκος -> Αποθήκευση του τρέχοντος μουσείου</li> 
              <li>Κάδος ανακύκλωσης -> Διαγραφή ενός στοιχείου</li> 
              </ul>
              Τέλος, η υπόλοιπη σελίδα είναι κενή, καθώς εκεί θα δημιουργήσετε το μουσείο σας.
          </div>
        </div>

      </div>
       <div class="card">
      <div class="card-header" id="headingFive">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Εισαγωγή μεγάλου τοίχου
        </button>
        </h5>
      </div>
      <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
        <div class="card-body">
        <p>
          Για να ξεκινήσετε να εισάγετε στοιχεία στο μουσείο σας, πρέπει καταρχάς να δημιουργήσετε τους εξωτερικούς τοίχους του.
		  Αυτό γίνεται πατώντας το κουμπί ΜΕΓΑΛΟΣ ΤΟΙΧΟΣ, από τη λίστα στα αριστερά της σελίδας.
		  Μεγάλους τοίχους θεωρούμε τους εξωτερικούς τοίχους του μουσείου.  Αυτό θα έχει ως αποτέλεσμα να μετατραπεί η σελίδα σας κάπως έτσι: <br>
        </p>
        <img src="../images/usermanual/big_walls.png"  width="500" height="300"><br>
        <p>
          Μπορείτε να εισάγετε μόνο έναν μεγάλο τοίχο, οπότε, σε περίπτωση επιλογής αυτού του κουμπιού, ενώ έχετε δημιουργήσει ήδη τους εξωτερικούς τοίχους, θα εμφανιστεί κατάλληλο μήνυμα λάθους.
        </p>
        ΠΡΟΣΟΧΗ!!!!!
        <p>Αν προσπαθήσετε να εισάγετε κάποιο έκθεμα, κάποια πόρτα ή κάποιον τοίχο, τότε η εφαρμογή σας ενημερώνει ότι αυτό δεν είναι δυνατό,
		χωρίς την ύπαρξη των εξωτερικών τοίχων, οπότε είναι απαραίτητο το πάτημα αυτού του κουμπιού αν θέλετε να ξεκινήσετε την κατασκευή του μουσείου σας.</p>
         <img src="../images/usermanual/exhibit_warning.png"  width="500" height="300"><br>
         <p>
           Όπως βλέπετε και στην παραπάνω εικόνα, προσπαθούμε να εισάγουμε ένα μεσαίου μεγέθους έκθεμα, χωρίς να έχουμε πατήσει το κουμπί Μεγάλος Τοίχος, και η εφαρμογή μας υποδεικνύει ότι, αν δεν εισάγουμε τους εξωτερικούς τοίχους, δεν μπορούμε να συνεχίσουμε
         </p>
        </div>
      </div>
      </div>

      <div class="card">
      <div class="card-header" id="headingSix">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
         Εισαγωγή εκθέματος
        </button>
        </h5>
      </div>
      <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
        <div class="card-body">
          <p>
              Για την εισαγωγή κάποιου εκθέματος στο μουσείο σας, πρέπει να πατήσετε το κουμπί ΕΚΘΕΜΑ, από το αριστερό μενού της σελίδας. Μόλις γίνει αυτό εμφανίζεται ένα καινούριο μενού με 3 επιλογές:
            <ul>
            <li>Small</li> 
             <li>Medium</li>
             <li>Large</li> 
          </ul>
            Αφού επιλέξετε κάποιο από τα 3, μπορείτε να πατήσετε σε οποιοδήποτε μέρος του μουσείου θέλετε να το εισάγετε.
			Ανάλογα με την επιλογή σας παραπάνω το έκθεμα που θα εμφανιστεί θα είναι το εξής: 
			
		  </p>
		  <img src="../images/usermanual/exhibits.png"  width="600" height="200"><br>
          
          Παρακάτω βλέπουμε ένα μουσείο, όπου έχουμε εισάγει ένα έκθεμα από κάθε μέγεθος και τα έχουμε τοποθετήσει σε συγκεκριμένα σημεία.<br> 
          <img src="../images/usermanual/exhibit1.png"  width="500" height="300"><br>
		  Υπάρχει η δυνατότητα μετακίνησης ενός εκθέματος όπως εσείς το επιθυμείτε, για περαιτέρω πληροφορίες μεταφερθείτε στο κεφάλαιο μετακίνηση αντικειμένων.

        </div>
      </div>
      </div>

		  <div class="card">
			<div class="card-header" id="headingSeven">
			  <h5 class="mb-0">
				<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
				 Εισαγωγή πόρτας
				</button>
			  </h5>
			</div>
			<div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
			  <div class="card-body">
			 <p>
        Μέσω της παλέτας στα αριστερά, σας δίνεται η δυνατότητα για την εισαγωγή μιας καινούριας πόρτας στο μουσείο. Πατώντας το κουμπί ΠΟΡΤΑ εμφανίζονται δύο επιλογές, η εισαγωγή οριζόντιας ή κάθετης πόρτας. Ο χρήστης έχει τη δυνατότητα να εισάγει μέχρι δύο πόρτες. Μόλις επιλέξετε τον τύπο της πόρτας, πρέπει να πατήσετε σε ένα σημείο του εξωτερικού τοίχου, όπου θέλετε να τη δημιουργήσετε.   
       </p>
        <img src="../images/usermanual/door1.png"  width="500" height="300"><br>
        <p>
          Στην παραπάνω εικόνα, επιλέξαμε το κουμπί ΠΟΡΤΑ και στη συνέχεια την επιλογή Horizontal. Έπειτα επιλέξαμε ένα σημείο του εξωτερικού τοίχου, όπου θέλαμε να την τοποθετήσουμε. <br>
          ΠΡΟΣΟΧΗ!!!!<br>
          Η πόρτα θα έχει ένα σταθερό μέγεθος, οπότε η εφαρμογή ελέγχει αν στο σημείο που επιλέξατε υπάρχει επαρκής χώρος για να φτιαχτεί. Αν δεν υπάρχει, τότε σας ενημερώνει με κατάλληλο μήνυμα, όπου σας προτρέπει να τη δημιουργήσετε κάπου αλλού.

        </p>
        <img src="../images/usermanual/door_warning.png"  width="500" height="300"><br>
        <p>
          Στην παραπάνω εικόνα, μπορείτε να παρατηρήσετε ότι προσπαθούμε να δημιουργήσουμε μία κάθετη πόρτα, στην κάτω αριστερή πλευρά του μουσείου.
		  Επειδή ο εξωτερικός τοίχος δεν επαρκεί ώστε να φτιαχτεί ολόκληρη η πόρτα, η εφαρμογή μας ενημερώνει ότι η κατασκευή αυτής δεν είναι δυνατή σε εκείνο το σημείο. <br>
          Η πρώτη πόρτα, που θα εισαγάγετε στο μουσείο σας θα είναι πάντα η είσοδός του.
		  Αν επιλέξετε να προσθέσετε και μια δεύτερη, τότε αυτή θα αναπαριστά την έξοδο.
		  Από την άλλη πλευρά, αν επιλέξετε να αποθηκεύσετε το μουσείο, με μόνο μία πόρτα, τότε αυτή θα μετατραπεί σε Είσοδο/Έξοδο.
		  Περνώντας το ποντίκι σας πάνω από μία πόρτα, μπορείτε να ενημερωθείτε για τον τύπο της (Είσοδος, Έξοδος ή και τα δύο).<br>

        </p>
		<img src="../images/usermanual/entrance1.png" width="400" height="200"  >
                <img src="../images/usermanual/exit.png"  width="400" height="200"><br>
			  </div>
			</div>
		  </div>

       <div class="card">
      <div class="card-header" id="headingEight">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
         Εισαγωγή εσωτερικών τοίχων
        </button>
        </h5>
      </div>
      <div id="collapseEight" class="collapse" aria-labelledby="headingEight" data-parent="#accordion">
        <div class="card-body">
           <p>
             Για να εισάγετε έναν εσωτερικό τοίχο στο μουσείο σας, αρκεί να πατήσετε το κουμπί ΤΟΙΧΟΣ, το οποίο βρίσκεται στην αριστερή πλευρά της σελίδας. Αμέσως μετά, κάνετε διπλό κλικ σε κάποιο σημείο εντός του μουσείου σας, το οποίο θα είναι η αρχή του τοίχου. Έπειτα, χωρίς να αφήσετε τον κέρσορα μπορείτε να μεταβάλλετε το μήκος του και την κατεύθυνσή του, ανάλογα με τις κινήσεις του ποντικιού σας. Μόλις αφήσετε τον κέρσορα, η τελική μορφή του τοίχου είναι έτοιμη. Υπάρχει η δυνατότητα μετακίνησης ενός έτοιμου τοίχου όπως εσείς το επιθυμείτε, για περαιτέρω πληροφορίες μεταφερθείτε στο κεφάλαιο μετακίνηση αντικειμένων (4.12).<br>
            Παρακάτω, μπορείτε να παρατηρήσετε ότι έχουμε δημιουργήσει έναν εσωτερικό τοίχο στο μουσείο μας. Αφού επιλέξαμε το κουμπί ΤΟΙΧΟΣ, αποφασίσαμε να τον φτιάξουμε ανάμεσα στα 2 μικρά εκθέματα, που υπήρχαν.<br>
           </p> 
           <img src="../images/usermanual/inside_walls_1.png"  width="500" height="300"><br>
           <img src="../images/usermanual/inside_walls_2.png"  width="500" height="300"><br>
           <p>
             Παραπάνω μπορείτε να παρατηρήσετε ένα μουσείο, στο οποίο έχουμε χρησιμοποιήσει όλες τις παραπάνω λειτουργίες. Όπως μπορείτε να παρατηρήσετε έχουμε προσθέσει 2 πόρτες, μία για είσοδο και μία για έξοδο, 5 εκθέματα (2 μικρού μεγέθους, 2 μεσαίου και 1 μεγάλου), καθώς και 3 εσωτερικούς τοίχους.
           </p>

        </div>
      </div>
      </div>


      <div class="card">
      <div class="card-header" id="headingNine">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
         Αποθήκευση μουσείου
        </button>
        </h5>
      </div>
      <div id="collapseNine" class="collapse" aria-labelledby="headingNine" data-parent="#accordion">
        <div class="card-body">
           <p>
             Αφού έχετε δημιουργήσει ένα μουσείο, πρέπει να το αποθηκεύσετε στο λογαριασμό σας, ώστε να είναι δυνατή η τροποποίησή του κάποια άλλη φορά ή και η προσομοίωση κίνησης σε αυτό. Για να αποθηκεύσετε το μουσείο σας, αρκεί να πατήσετε τη δισκέτα, η οποία βρίσκεται στο πάνω αριστερά μέρος της οθόνης.
           </p>
            <img src="../images/usermanual/save_1.png" ><br>
            <p>
              Μόλις πατήσετε αυτό το κουμπί, η εφαρμογή ελέγχει αν πληρούνται κάποιες προϋποθέσεις, οι οποίες είναι απαραίτητες για να θεωρείται ένα μουσείο έγκυρο. Αυτές είναι:
              <ul>
                <li>Ύπαρξη εξωτερικών τοίχων</li>
                 <li>Ύπαρξη τουλάχιστον ενός εκθέματος</li>
                <li>Ύπαρξη τουλάχιστον μίας πόρτας</li>
              </ul>
              Αν κάποια από αυτές τις 3 προϋποθέσεις δεν ισχύει, τότε η εφαρμογή εμφανίζει κατάλληλο μήνυμα λάθους.
            </p>
            <img src="../images/usermanual/save2.png"  ><br>
            <p>
              Από την άλλη πλευρά, αν το μουσείο είναι έγκυρο, τότε εμφανίζεται ένα καινούριο παράθυρο διαλόγου, το οποίο σας ζητάει να δώσετε ένα όνομα στο μουσείο σας.
            </p>
            <img src="../images/usermanual/save3.png"  ><br>
            <p>
              Όπως μπορείτε να παρατηρήσετε, η εφαρμογή σας προτείνει ένα default όνομα (museum), το οποίο μπορείτε να χρησιμοποιήσετε ή να το αγνοήσετε και να πληκτρολογήσετε κάποιο δικό σας όνομα. Αφού αποφασίσετε για το όνομα του μουσείου, κάνετε κλικ στο κουμπί  OK, ώστε να αποθηκευτεί στον λογαριασμό σας.
            </p>
              <img src="../images/usermanual/save4.png" >
                <img src="../images/usermanual/save5.png"  ><br>
            <p>
              Σε περίπτωση που το όνομα που επιλέξατε έχει χρησιμοποιηθεί ήδη και σε κάποιο άλλο ήδη υπάρχον μουσείο σας, τότε η εφαρμογή σας ενημερώνει ότι αυτό το όνομα υπάρχει, οπότε η αποθήκευση δεν ολοκληρώνεται.
            </p>
            <img src="../images/usermanual/save6.png"  >
                <img src="../images/usermanual/save7.png"  ><br>
        </div>
      </div>
      </div>

      <div class="card">
      <div class="card-header" id="headingTen">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
        Διαγραφή αντικειμένου
        </button>
        </h5>
      </div>
      <div id="collapseTen" class="collapse" aria-labelledby="headingTen" data-parent="#accordion">
        <div class="card-body">
           <p>
             Αν θέλετε να διαγράψετε ένα αντικείμενο από το μουσείο σας, σας δίνεται αυτή η δυνατότητα, με τη χρήση του κάδου ανακύκλωσης, ο οποίος βρίσκεται στο μενού δίπλα από το username σας, στο πάνω μέρος της οθόνης.
           </p>
           <img src="../images/usermanual/delete1.png"  ><br>
           <p>
             Πατώντας αυτό το κουμπί μπορείτε να διαγράψετε ένα αντικείμενο από το μουσείο σας. Με τον όρο αντικείμενο, μπορεί να εννοηθεί ένα έκθεμα, μία πόρτα ή ένας εσωτερικός τοίχος του μουσείου σας. Για να διαγράψετε ένα αντικείμενο, αφού έχετε πατήσει το παραπάνω κουμπί, απλά κλικάρετε πάνω σε αυτό. Αν κλικάρετε σε κάποιο σημείο του μουσείου, στο οποίο δεν βρίσκεται κάποιο αντικείμενο, τότε η εφαρμογή δεν εκτελεί κάποια ενέργεια και περιμένει να κλικάρετε κάποιο αντικείμενο. Επίσης, αν κλικάρετε εκτός του μουσείου, η εφαρμογή σας ενημερώνει ότι η διαγραφή δεν είναι δυνατή.
           </p>
            <img src="../images/usermanual/delete2.png"  width="500" height="300"><br>
            <p>
              Μπορείτε να διαγράψετε μόνο ένα αντικείμενο τη φορά, οπότε για να διαγράψετε κάποιο άλλο αντικείμενο θα πρέπει να επιλέξετε και πάλι το κουμπί του κάδου ανακύκλωσης.
            </p>
        </div>
      </div>
      </div>

<div class="card">
      <div class="card-header" id="headingEleven
      ">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
        Επαναφόρτωση μουσείου 
        </button>
        </h5>
      </div>
      <div id="collapseEleven" class="collapse" aria-labelledby="headingEleven" data-parent="#accordion">
        <div class="card-body">
          <p>
            Αν επιθυμείτε να επαναφορτώσετε ένα ήδη αποθηκευμένο μουσείο, από τον λογαριασμό σας, αρκεί να πατήσετε το κουμπί Load Museum, από το αριστερό μενού, της αρχικής σελίδας.
          </p>
          <img src="../images/usermanual/reload1.png"  ><br>
          <p>
            Αφού πατήσετε  το παραπάνω κουμπί μεταφέρεστε σε μια νέα σελίδα που περιέχει έναν πίνακα με όλα τα μουσεία που έχετε κατασκευάσει. Από αυτόν τον πίνακα σας δίνεται η δυνατότητα για:
            <ul>
              <li>Επιπρόσθετη επεξεργασία υπάρχοντος μουσείου </li> 
               <li> Προσομοίωση κίνησης επισκεπτών μουσείου </li>
            </ul>
          </p>
          <img src="../images/usermanual/reload2.png"  width="500" height="300"><br>
          <p>
            Σε αυτή τη σελίδα, μπορείτε να παρατηρήσετε όλα τα μουσεία, που έχει δημιουργήσει ο χρήστης με username NikosKoutroumanis. Για να επαναφορτώσετε κάποιο μουσείο, κάνετε κλικ στο κουμπί Show more της στήλης Load Museum, που βρίσκεται στην ίδια γραμμή με το όνομα του μουσείου.  
          </p>
          <img src="../images/usermanual/reload3.png"  width="500" height="300"><br>
          <p>
            Για παράδειγμα, αν θέλουμε να επαναφορτώσουμε το μουσείο mymuseum, που κατασκευάσαμε προηγουμένως, επιλέγουμε το κουμπί Show more, όπως φαίνεται και στην εικόνα.
            Αφού πατήσετε το κουμπί, που αναφέραμε, μεταφέρεστε σε μία σελίδα, η οποία περιέχει τα ίδια μενού, που αναφέραμε και στην υποενότητα 4.4, καθώς και το μουσείο που είχατε αποθηκεύσει πιο πριν στον λογαριασμό σας. 
            Σε αυτή την σελίδα είναι διαθέσιμες όλες οι λειτουργίες, που αναφέρθηκαν παραπάνω. Αυτό σημαίνει ότι μπορείτε να:
            <ul>
              <li>Προσθέσετε καινούρια εκθέματα</li> 
              <li>Προσθέσετε εσωτερικούς τοίχους</li> 
              <li>Προσθέσετε πόρτα/πόρτες</li>
              <li>Διαγράψετε αντικείμενα</li> 
              <li> Μετακινήσετε εκθέματα και εσωτερικούς τοίχους</li>
             <li>Αποθηκεύσετε εκ νέου το μουσείο</li>  
            </ul>
          </p>
        </div>
      </div>
      </div>

      <div class="card">
      <div class="card-header" id="headingTwelve">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
          Μετακίνηση αντικειμένων 
        </button>
        </h5>
      </div>
      <div id="collapseTwelve" class="collapse" aria-labelledby="headingTwelve" data-parent="#accordion">
        <div class="card-body">
          <p>
            Σε περίπτωση που επιθυμείτε να αλλάξετε τη θέση ενός εκθέματος ή ενός εσωτερικού τοίχου, η εφαρμογή σας δίνει τη δυνατότητα μετακίνησής τους. Τα αντικείμενα μπορούν να μετακινηθούν από μια αρχική θέση σε οποιαδήποτε άλλη μέσα στον χώρο του μουσείου. Για να μετακινήσετε ένα αντικείμενο, κάνετε αριστερό κλικ πάνω του και στη συνέχεια - χωρίς να το αφήσετε - μετακινήστε τον κέρσορα προς την κατεύθυνση που επιθυμείτε. Όταν είστε ικανοποιημένοι με τη θέση του αντικειμένου, αφήστε απλά το αριστερό κλικ ελεύθερο.
          </p>
            <img src="../images/usermanual/move1.png"  width="500" height="300">
            <img src="../images/usermanual/move2.png"  width="500" height="300"><br>
        </div>
      </div>
      </div>

<div class="card">
      <div class="card-header" id="headingThirteen">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
          Προσομοίωση κίνησης
        </button>
        </h5>
      </div>
      <div id="collapseThirteen" class="collapse" aria-labelledby="headingThirteen" data-parent="#accordion">
        <div class="card-body">
          <p>
            Σας δίνεται η δυνατότητα να προσομοιώσετε την κίνηση επισκεπτών στο μουσείο. Πρόκειται για ένα πολύ σημαντικό εργαλείο, το οποίο σας βοηθά στο να καταλάβετε ποια εκθέματα εχουν μεγαλύτερη επισκεψιμότητα  και να συμπεράνετε αν η θέση στην οποία έχετε τοποθετήσει κάποιο έκθεμα είναι η σωστή. Αν επιθυμείτε να προσομοιώσετε κίνηση σε ένα υπάρχον μουσείο από τον λογαριασμό σας, αρκεί να πατήσετε το κουμπί Show more στην κατηγορία Animate Museum, από τη δεξιά πλευρά του πίνακα, που εμφανίζεται στην σελίδα Load Museum. Όπως αναφέραμε και παραπάνω, για να μεταφερθείτε στη σελίδα Load Museum, πρέπει να επιλέξετε το κουμπί Load Museum, από το μενού που βρίσκεται στην αριστερή πλευρά της αρχικής σελίδας.
          </p>
          <img src="../images/usermanual/animate1.png"  width="500" height="300"><br>
          <p>
            Πατώντας τον σύνδεσμο Show more εμφανίζεται μια νέα σελίδα που περιέχει:
            <ol>
            <li>Το username σας, καθώς και 2 κουμπιά για τη δημιουργία & την αποθήκευση heatmap κίνησης ως εικόνας στον υπολογιστή σας (πάνω αριστερά)</li>
            <li>Την κάτοψη του μουσείου που επιλέξατε στην προηγούμενη σελίδα (κέντρο)</li>
            <li>Μια φόρμα για την εισαγωγή των στοιχείων της κίνησης επισκεπτών (κάτω)</li>
            </ol>
          </p>
          <img src="../images/usermanual/animate2.png"  width="500" height="300"><br>
          <p>
            Για να προσομοιώσετε την κίνηση επισκεπτών στο μουσείο σας, πρέπει να συμπληρώσετε αυτή την φόρμα.
          </p>
          <img src="../images/usermanual/animate3.png"  ><br>
          <p>
            Τα στοιχεία που πρέπει να συμπληρώσετε είναι:
            <ul>
               <li>Path: Το μονοπάτι που θα ακολουθήσει ο υποτιθέμενος επισκέπτης. Εισάγετε τον αριθμό κάθε εκθέματος που θα δει η ομάδα επισκεπτών. Πρέπει να ξεχωρίζετε τα εκθέματα χρησιμοποιώντας τον χαρακτήρα κόμμα(,).</li> 
               <li>Quantity:  Ο αριθμός της ομάδας των επισκεπτών (εισάγετε έναν αριθμό από το 1 μέχρι το 100)</li> 
                <li>Η κατηγορία των ατόμων που εισέρχονται στο μουσείο. Κάθε κατηγορία θα φαίνεται στην προσομοίωση με διαφορετικό χρώμα (π.χ οικογένεια=πράσινο, σχολείο=κόκκινο, άλλοι επισκέπτες=μπλε)</li>  
            </ul>
          </p>
          <img src="../images/usermanual/animate4.png"  ><br>
          <p>
            Αφού συμπληρώσετε τη φόρμα, πρέπει να κλικάρετε στο κουμπί submit, ώστε να ξεκινήσει η προσομοίωση της κίνησης, που επιλέξατε. Για παράδειγμα, με βάση τα στοιχεία που εισαγάγαμε στην φόρμα που βλέπουμε παραπάνω, μόλις κλικάρουμε το κουμπί submit, παρατηρούμε το εξής:
          </p>
          <img src="../images/usermanual/animate5.png"  width="500" height="300"><br>
          <p>
            Όπως βλέπετε, πλέον υπάρχουν στο μουσείο μας 15 κόκκινοι κύκλοι, που αντιπροσωπεύουν τα 15 άτομα του σχολείου, που εισαγάγαμε, πριν από λίγο. Όλα τα άτομα ακολουθούν την ίδια κίνηση, με κάποια καθυστέρηση. Αφού τελειώσουν την προκαθορισμένη κίνησή τους, όλα τα άτομα φεύγουν από το μουσείο, χρησιμοποιώντας την ανάλογη πόρτα εξόδου.
            <br>
            Σε περίπτωση, που το δοθέν μονοπάτι, δεν είναι δυνατό να πραγματοποιηθεί, διότι δεν υπάρχει μονοπάτι προς ή από κάποιο έκθεμα, τότε η εφαρμογή σας ενημερώνει με κατάλληλο μήνυμα λάθους, ώστε να επιστρέψετε στην προηγούμενη σελίδα (Load Museum) και να πραγματοποιήσετε τις απαραίτητες τροποποιήσεις στο μουσείο σας.

          </p>
          <img src="../images/usermanual/animate6.png"  width="500" height="300"><br>
          <p>
            Παραπάνω παρατηρούμε ότι έχουμε τροποποιήσει ελάχιστα το προηγούμενο μουσείο μας. Συγκεκριμένα, μετακινήσαμε το έκθεμα 1, ώστε να μην είναι δυνατό να δημιουργηθεί ένα μονοπάτι από ή προς αυτό. Στη συνέχεια, εισαγάγαμε στην φόρμα, το μονοπάτι 1,2,3,4,5. Το αποτέλεσμα, που προέκυψε είναι το παρακάτω.
          </p>
          <img src="../images/usermanual/animate7.png"  ><br>
          <p>
            Η εφαρμογή δεν κατάφερε να δημιουργήσει ένα μονοπάτι που να περιέχει όλα τα εκθέματα που δηλώσαμε, οπότε μας ενημερώνει ότι υπάρχει πιθανόν κάποιο λάθος στην κατασκευή του μουσείου και μας προτρέπει να μεταβούμε ξανά στο Load Museum, ώστε να το διορθώσουμε.
          </p>
        </div>
      </div>
      </div>


<div class="card">
      <div class="card-header" id="headingFourteen">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
         Δημιουργία heatmap
        </button>
        </h5>
      </div>
      <div id="collapseFourteen" class="collapse" aria-labelledby="headingFourteen" data-parent="#accordion">
        <div class="card-body">
          <p>
            Αφού έχετε εισαγάγει διάφορες κινήσεις ομάδων ατόμων στο μουσείο σας, η εφαρμογή σας δίνει τη δυνατότητα δημιουργίας ενός heatmap κίνησης, το οποίο δείχνει ποια σημεία του μουσείου (εκθέματα και μη) έχουν μεγαλύτερη συχνότητα επίσκεψης.
            Για να δημιουργήσετε αυτό το heatmap, αρκεί να πατήσετε το κουμπί Play, το οποίο βρίσκεται στην πάνω αριστερή πλευρά της σελίδας, δίπλα από το username σας. 
          </p>
           <img src="../images/usermanual/heatmap1.png"  ><br>

          <p>
            Μόλις το πατήσετε, θα εμφανιστεί πάνω στο μουσείο σας, το παραγόμενο heatmap, με βάση όλες τις προηγούμενες εισαγόμενες προσομοιώσεις κίνησης.
          </p>
          <img src="../images/usermanual/heatmap2.png"  width="500" height="300"><br>
          <p>
            Παραπάνω βλέπουμε το μουσείο μας μαζί με το heatmap, που δημιουργήθηκε. Όσο πιο κόκκινο είναι το heatmap, τόσο μεγαλύτερη είναι η συχνότητα επίσκεψης εκείνου του σημείου. Παρατηρούμε ότι το περισσότερο επισκέψιμο σημείο του μουσείου μας βρίσκεται κοντά στην είσοδό του, εκεί που ενώνονται τα δύο επιμέρους δωμάτια, που υπάρχουν.
          </p>
        </div>
      </div>
      </div>


      <div class="card">
      <div class="card-header" id="headingFifteen">
        <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
         Αποθήκευση heatmap ως εικόνα
        </button>
        </h5>
      </div>
      <div id="collapseFifteen" class="collapse" aria-labelledby="headingFifteen" data-parent="#accordion">
        <div class="card-body">
          <p>
            Τέλος, σας δίνεται η δυνατότητα αποθήκευσης του heatmap που μόλις δημιουργήθηκε, σε μορφή εικόνας (png). Αυτό συμβαίνει πατώντας το κουμπί της δισκέτας, που βρίσκεται στην πάνω αριστερά πλευρά της σελίδας δίπλα από το κουμπί της δημιουργίας heatmap. 
          </p>
          <img src="../images/usermanual/saveheat1.png"  ><br>
          <p>
            Μόλις πατηθεί το συγκεκριμένο κουμπί εμφανίζεται ένα μήνυμα στην οθόνη, που σας ρωτάει πώς θέλετε να ονομάσετε την εικόνα. 
          </p>
           <img src="../images/usermanual/saveheat2.png"  ><br>
           <p>
             Αφού πληκτρολογήσετε το όνομα, που επιθυμείτε να έχει η εικόνα και πατήσετε το κουμπί OK, η εφαρμογή σας ενημερώνει ότι το αρχείο είναι έτοιμο για λήψη στον τοπικό χώρο αποθήκευσής σας και η λήψη ξεκινάει.
           </p>
            <img src="../images/usermanual/saveheat3.png"  ><br>
             <img src="../images/usermanual/saveheat4.png"  ><br>
        </div>
      </div>
      </div>

	</div>

    </main>
  </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      <script>window.jQuery || document.write('<script src="../assets/js/vendor/jquery.slim.min.js"><\/script>')</script><script src="../assets/dist/js/bootstrap.bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
        <script src="../js/dashboard.js"></script></body>
</html>
