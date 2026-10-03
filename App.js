import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function App() {
  const allWords = [
    {
      english: 'Hello',
      hindi: 'नमस्ते',
      pronunciation: 'Namaste',
      category: 'Vocabulary',
    },
    {
      english: 'Friend',
      hindi: 'दोस्त',
      pronunciation: 'Dost',
      category: 'Vocabulary',
    },
    {
      english: 'Water',
      hindi: 'पानी',
      pronunciation: 'Paani',
      category: 'Vocabulary',
    },
    {
      english: 'Book',
      hindi: 'किताब',
      pronunciation: 'Kitaab',
      category: 'Vocabulary',
    },
    {
      english: 'Good Morning',
      hindi: 'सुप्रभात',
      pronunciation: 'Suprabhaat',
      category: 'Phrases',
    },
    {
      english: 'Thank You',
      hindi: 'धन्यवाद',
      pronunciation: 'Dhanyavaad',
      category: 'Phrases',
    },
    {
      english: 'How are you?',
      hindi: 'आप कैसे हैं?',
      pronunciation: 'Aap kaise hain?',
      category: 'Phrases',
    },
    {
      english: 'I am fine',
      hindi: 'मैं ठीक हूँ',
      pronunciation: 'Main theek hoon',
      category: 'Phrases',
    },
    {
      english: 'I am a student',
      hindi: 'मैं एक विद्यार्थी हूँ',
      pronunciation: 'Main ek vidyaarthi hoon',
      category: 'Grammar',
    },
    {
      english: 'She is happy',
      hindi: 'वह खुश है',
      pronunciation: 'Wah khush hai',
      category: 'Grammar',
    },
  ];

  const [selectedCategory, setSelectedCategory] =
    useState('Vocabulary');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [screen, setScreen] = useState('learn');

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const filteredWords = allWords.filter(
    item => item.category === selectedCategory
  );

  const currentWord = filteredWords[currentIndex];

  const quizWords = allWords;

  const currentQuizWord = quizWords[quizIndex];

  const selectCategory = category => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setShowAnswer(false);
    setScreen('learn');
  };

  const nextWord = () => {
    if (filteredWords.length === 0) return;

    setCurrentIndex(
      (currentIndex + 1) % filteredWords.length
    );

    setShowAnswer(false);
  };

  const previousWord = () => {
    if (filteredWords.length === 0) return;

    setCurrentIndex(
      (currentIndex - 1 + filteredWords.length) %
        filteredWords.length
    );

    setShowAnswer(false);
  };

  const startQuiz = () => {
    setScreen('quiz');
    setQuizIndex(0);
    setQuizScore(0);
    setAnswered(false);
  };

  const checkAnswer = correct => {
    if (answered) return;

    setAnswered(true);

    if (correct) {
      setQuizScore(prev => prev + 1);
      Alert.alert('Correct!', 'Great job! 🎉');
    } else {
      Alert.alert(
        'Keep Practicing',
        'You can learn this word from the flashcards.'
      );
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizWords.length - 1) {
      setQuizIndex(prev => prev + 1);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore =
      quizScore + (answered ? 0 : 0);

    setScreen('learn');
    setSelectedCategory('Vocabulary');
    setCurrentIndex(0);
    setShowAnswer(false);
    setAnswered(false);

    Alert.alert(
      'Quiz Completed 🎉',
      'Your score: ' +
        finalScore +
        ' / ' +
        quizWords.length,
      [
        {
          text: 'Continue Learning',
          onPress: () => {
            setScreen('learn');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            LANGUAGE LEARNER
          </Text>

          <Text style={styles.subtitle}>
            Learn • Practice • Improve
          </Text>
        </View>

        <Text style={styles.headerIcon}>🌍</Text>
      </View>

      {/* TOP MENU */}

      <View style={styles.menuContainer}>

        <TouchableOpacity
          style={[
            styles.menuButton,
            screen === 'learn' && styles.activeMenu,
          ]}
          onPress={() => setScreen('learn')}
        >
          <Text
            style={[
              styles.menuText,
              screen === 'learn' &&
                styles.activeMenuText,
            ]}
          >
            📖 Learn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            screen === 'quiz' && styles.activeMenu,
          ]}
          onPress={startQuiz}
        >
          <Text
            style={[
              styles.menuText,
              screen === 'quiz' &&
                styles.activeMenuText,
            ]}
          >
            📝 Quiz
          </Text>
        </TouchableOpacity>

      </View>

      {/* LEARN SCREEN */}

      {screen === 'learn' ? (

        <View>

          <Text style={styles.sectionTitle}>
            Choose Category
          </Text>

          <View style={styles.categoryRow}>

            {/* VOCABULARY */}

            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory === 'Vocabulary' &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                selectCategory('Vocabulary')
              }
            >
              <Text style={styles.categoryIcon}>
                📚
              </Text>

              <Text
                style={[
                  styles.categoryText,
                  selectedCategory ===
                    'Vocabulary' &&
                    styles.selectedCategoryText,
                ]}
              >
                Vocabulary
              </Text>

              <Text style={styles.categoryCount}>
                Words
              </Text>
            </TouchableOpacity>

            {/* GRAMMAR */}

            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory === 'Grammar' &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                selectCategory('Grammar')
              }
            >
              <Text style={styles.categoryIcon}>
                ✏️
              </Text>

              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'Grammar' &&
                    styles.selectedCategoryText,
                ]}
              >
                Grammar
              </Text>

              <Text style={styles.categoryCount}>
                Practice
              </Text>
            </TouchableOpacity>

            {/* PHRASES */}

            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory === 'Phrases' &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                selectCategory('Phrases')
              }
            >
              <Text style={styles.categoryIcon}>
                💬
              </Text>

              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'Phrases' &&
                    styles.selectedCategoryText,
                ]}
              >
                Phrases
              </Text>

              <Text style={styles.categoryCount}>
                Sentences
              </Text>
            </TouchableOpacity>

          </View>

          {/* CURRENT CATEGORY */}

          <View style={styles.categoryHeading}>
            <Text style={styles.sectionTitle}>
              {selectedCategory}
            </Text>

            <Text style={styles.wordCount}>
              {currentIndex + 1} /{' '}
              {filteredWords.length}
            </Text>
          </View>

          {/* PROGRESS */}

          <View style={styles.progressBox}>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width:
                      ((currentIndex + 1) /
                        filteredWords.length) *
                        100 +
                      '%',
                  },
                ]}
              />
            </View>

          </View>

          {/* FLASHCARD */}

          {currentWord && (

            <View style={styles.flashcard}>

              <View style={styles.wordBadge}>
                <Text style={styles.badgeText}>
                  {selectedCategory}
                </Text>
              </View>

              <Text style={styles.word}>
                {currentWord.english}
              </Text>

              {!showAnswer ? (

                <Text style={styles.tapText}>
                  Tap below to reveal translation
                </Text>

              ) : (

                <View style={styles.answerBox}>

                  <Text style={styles.translationLabel}>
                    TRANSLATION
                  </Text>

                  <Text style={styles.translation}>
                    {currentWord.hindi}
                  </Text>

                  <Text style={styles.pronunciation}>
                    🔊 {currentWord.pronunciation}
                  </Text>

                </View>

              )}

              <TouchableOpacity
                style={styles.showButton}
                onPress={() =>
                  setShowAnswer(!showAnswer)
                }
              >
                <Text style={styles.showButtonText}>
                  {showAnswer
                    ? 'Hide Translation'
                    : 'Show Translation'}
                </Text>
              </TouchableOpacity>

            </View>

          )}

          {/* PREVIOUS / NEXT */}

          <View style={styles.navigation}>

            <TouchableOpacity
              style={styles.navButton}
              onPress={previousWord}
            >
              <Text style={styles.navText}>
                ← Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={nextWord}
            >
              <Text style={styles.navText}>
                Next →
              </Text>
            </TouchableOpacity>

          </View>

          {/* QUIZ */}

          <TouchableOpacity
            style={styles.quizButton}
            onPress={startQuiz}
          >
            <Text style={styles.quizButtonText}>
              📝 Start Practice Quiz
            </Text>
          </TouchableOpacity>

        </View>

      ) : (

        /* QUIZ SCREEN */

        <View>

          <View style={styles.quizHeader}>

            <Text style={styles.quizTitle}>
              Practice Quiz
            </Text>

            <Text style={styles.quizProgress}>
              Question {quizIndex + 1} /{' '}
              {quizWords.length}
            </Text>

          </View>

          <View style={styles.quizCard}>

            <Text style={styles.quizQuestion}>
              What is the Hindi meaning of:
            </Text>

            <Text style={styles.quizWord}>
              {currentQuizWord.english}
            </Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                checkAnswer(
                  currentQuizWord.hindi ===
                    currentQuizWord.hindi
                );
              }}
            >
              <Text style={styles.optionText}>
                {currentQuizWord.hindi}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() =>
                checkAnswer(false)
              }
            >
              <Text style={styles.optionText}>
                किताब
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() =>
                checkAnswer(false)
              }
            >
              <Text style={styles.optionText}>
                पानी
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() =>
                checkAnswer(false)
              }
            >
              <Text style={styles.optionText}>
                दोस्त
              </Text>
            </TouchableOpacity>

            {answered && (

              <TouchableOpacity
                style={styles.nextQuizButton}
                onPress={nextQuizQuestion}
              >
                <Text style={styles.nextQuizText}>
                  {quizIndex ===
                  quizWords.length - 1
                    ? 'Finish Quiz ✓'
                    : 'Next Question →'}
                </Text>
              </TouchableOpacity>

            )}

          </View>

          <View style={styles.scoreBox}>

            <Text style={styles.scoreLabel}>
              Current Score
            </Text>

            <Text style={styles.score}>
              {quizScore}
            </Text>

          </View>

          {/* BACK TO LEARN */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen('learn')}
          >
            <Text style={styles.backText}>
              ← Back to Learning
            </Text>
          </TouchableOpacity>

        </View>

      )}

      <Text style={styles.footer}>
        Language Learning App • CodeAlpha Task
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F4FF',
  },

  content: {
    padding: 18,
    paddingBottom: 45,
  },

  header: {
    backgroundColor: '#5B3CC4',
    padding: 23,
    borderRadius: 22,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#E8E0FF',
    marginTop: 6,
    fontSize: 14,
  },

  headerIcon: {
    fontSize: 42,
  },

  menuContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 15,
    marginBottom: 18,
    elevation: 2,
  },

  menuButton: {
    flex: 1,
    padding: 12,
    borderRadius: 11,
    alignItems: 'center',
  },

  activeMenu: {
    backgroundColor: '#5B3CC4',
  },

  menuText: {
    color: '#756A8A',
    fontWeight: 'bold',
  },

  activeMenuText: {
    color: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#30264A',
    marginBottom: 12,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categoryCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    paddingVertical: 16,
    paddingHorizontal: 5,
    borderRadius: 17,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E9E3F5',
  },

  selectedCategory: {
    backgroundColor: '#5B3CC4',
    borderColor: '#5B3CC4',
  },

  categoryIcon: {
    fontSize: 27,
  },

  categoryText: {
    color: '#30264A',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center',
  },

  selectedCategoryText: {
    color: '#FFFFFF',
  },

  categoryCount: {
    color: '#8B82A0',
    fontSize: 10,
    marginTop: 4,
  },

  categoryHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
  },

  wordCount: {
    color: '#5B3CC4',
    fontWeight: 'bold',
  },

  progressBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
  },

  progressBackground: {
    height: 9,
    backgroundColor: '#E8E2F5',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 9,
    backgroundColor: '#16B8A6',
    borderRadius: 10,
  },

  flashcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 27,
    minHeight: 330,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  wordBadge: {
    backgroundColor: '#E8F8F5',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 17,
  },

  badgeText: {
    color: '#129A8A',
    fontWeight: 'bold',
    fontSize: 12,
  },

  word: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#30264A',
    textAlign: 'center',
  },

  tapText: {
    color: '#8B82A0',
    marginTop: 18,
    textAlign: 'center',
  },

  answerBox: {
    alignItems: 'center',
    marginTop: 20,
  },

  translationLabel: {
    color: '#8B82A0',
    fontSize: 11,
    letterSpacing: 1,
  },

  translation: {
    fontSize: 28,
    color: '#5B3CC4',
    fontWeight: 'bold',
    marginTop: 6,
  },

  pronunciation: {
    color: '#129A8A',
    fontSize: 15,
    marginTop: 8,
  },

  showButton: {
    backgroundColor: '#16B8A6',
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 13,
    marginTop: 25,
  },

  showButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  navButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
  },

  navText: {
    color: '#5B3CC4',
    fontWeight: 'bold',
  },

  quizButton: {
    backgroundColor: '#5B3CC4',
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 18,
  },

  quizButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  quizHeader: {
    backgroundColor: '#5B3CC4',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },

  quizTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  quizProgress: {
    color: '#E8E0FF',
    marginTop: 5,
  },

  quizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    elevation: 4,
  },

  quizQuestion: {
    color: '#756A8A',
    textAlign: 'center',
    fontSize: 15,
  },

  quizWord: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#30264A',
    textAlign: 'center',
    marginVertical: 20,
  },

  optionButton: {
    borderWidth: 1,
    borderColor: '#DDD5EE',
    padding: 15,
    borderRadius: 13,
    marginTop: 10,
    backgroundColor: '#FBFAFE',
  },

  optionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#30264A',
    fontWeight: '600',
  },

  nextQuizButton: {
    backgroundColor: '#16B8A6',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 18,
  },

  nextQuizText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  scoreBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 17,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
  },

  scoreLabel: {
    color: '#756A8A',
  },

  score: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#5B3CC4',
    marginTop: 4,
  },

  backButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 14,
  },

  backText: {
    color: '#5B3CC4',
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    color: '#8B82A0',
    fontSize: 12,
    marginTop: 25,
  },

});
