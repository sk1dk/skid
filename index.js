const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    parent: 'gameContainer',  // Ensure the game is contained within the div
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

let player;
const playerSpeed = 200;

function preload() {
    // Load the player image  a URL or from local assets
    this.load.image('player', 'https://media.discordapp.net/attachments/1147972308917555401/1267649292051550241/IMG_5718.png?ex=66a98de7&is=66a83c67&hm=0defb2fa76b4cdd1495aa962ed67414809c8299c63b36436270561c2e8a1f2fc&');  // Ensure this path is correct
}

function create() {
    // Create the player sprite at the center of the screen
    player = this.physics.add.sprite(400, 300, 'player');
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Reset the player's velocity
    player.setVelocity(0);

    // Move the player based on cursor key inputs
    if (this.cursors.left.isDown) {
        player.setVelocityX(-playerSpeed);
    } else if (this.cursors.right.isDown) {
        player.setVelocityX(playerSpeed);
    }

    if (this.cursors.up.isDown) {
        player.setVelocityY(-playerSpeed);
    } else if (this.cursors.down.isDown) {
        player.setVelocityY(playerSpeed);
    }
}